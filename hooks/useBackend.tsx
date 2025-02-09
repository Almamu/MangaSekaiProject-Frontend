import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Client, TokenResponse } from "@/domain/backend";
import { useAxios } from "@/hooks/useAxios";
import { useServerSettings } from "@/hooks/useServerSettings";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useActiveServer } from "@/hooks/useActiveServer";
import { Temporal } from "temporal-polyfill";
import { Text } from "@/components/ui/Text";

interface ContextProps {
  overrideServer(address: string, token?: string): void;
  client: Client;
}

export const BackendContext = createContext<ContextProps>({} as ContextProps);

export function BackendContextProvider({ children }: PropsWithChildren) {
  const axios = useAxios();
  const serverSettings = useServerSettings();
  const activeServer = useActiveServer();
  const [serverToken, setServerToken] = useState<string | undefined>(
    activeServer?.token
  );
  const [loading, setLoading] = useState<boolean>(true);
  const client = useMemo(() => {
    return new Client(activeServer?.address, axios);
  }, [activeServer, axios]);
  const overrideServer = useCallback(
    (address: string, token?: string) => {
      client.setBaseUrl(address);
      setServerToken(token);
    },
    [client]
  );
  useEffect(() => {
    setServerToken(activeServer?.token);
  }, [activeServer]);

  // takes care of refreshing the interceptors used when the token changes
  useEffect(() => {
    const status: { refreshCall?: Promise<TokenResponse> } = {
      refreshCall: undefined,
    };

    // setup new interceptors to add the token
    const interceptor = axios.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        config.headers = config.headers ?? {};

        // only wait for requests not to the refresh endpoint
        if (status.refreshCall && !config.url?.endsWith("/refresh")) {
          await status.refreshCall;
        }

        if (serverToken && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${serverToken}`;
        }

        return config;
      },
      async (error: AxiosError) => {
        // request failed, is it because authentication?
        if (error.code !== "401" || !activeServer) {
          return Promise.reject(error);
        }

        // guard here for subsequent calls intercepted while the refresh happens
        // in the background
        if (status.refreshCall) {
          return status.refreshCall;
        }

        // store the call and wait for the result, after assign undefined again
        status.refreshCall = client.refreshToken(
          error.config?.signal as AbortSignal | undefined
        );
        const refresh = await status.refreshCall;

        serverSettings.actions.setToken(
          activeServer.guid,
          refresh.token,
          Temporal.Now.instant().epochSeconds + refresh.expires_in
        );

        status.refreshCall = undefined;
        return refresh;
      }
    );

    setLoading(false);

    return () => {
      // remove the added interceptor
      axios.interceptors.request.eject(interceptor);
    };
  }, [axios, client, serverSettings.actions, activeServer, serverToken]);

  // loading needed because the useEffect runs after first render, instead of doing so on call
  // so any call under here to useQuery will run before the interceptor is registered
  if (loading) {
    // TODO: SHOW LOADING SCREEN
    return <Text>Loading settings...</Text>;
  }

  return (
    <BackendContext.Provider value={{ overrideServer, client }}>
      {children}
    </BackendContext.Provider>
  );
}

export const useBackendClient = () => useBackendContext().client;
export const useBackendContext = () => useContext(BackendContext);
