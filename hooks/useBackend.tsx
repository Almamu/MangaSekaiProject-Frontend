import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Client } from "@/domain/backend";
import { useAxios } from "@/hooks/useAxios";
import { useServerSettings } from "@/hooks/useServerSettings";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

interface ContextProps {
  overrideServer(address: string, token?: string): void;
  client: Client;
}

export const BackendContext = createContext<ContextProps>({} as ContextProps);

export function BackendContextProvider({ children }: PropsWithChildren) {
  const axios = useAxios();
  const serverSettings = useServerSettings();
  const [serverToken, setServerToken] = useState<string | undefined>();
  const client = useMemo(() => {
    return new Client("", axios);
  }, [axios]);
  const overrideServer = useCallback(
    (address: string, token?: string) => {
      client.setBaseUrl(address);
      setServerToken(token);
    },
    [client]
  );

  // takes care of refreshing the interceptors used when the token changes
  useEffect(() => {
    // clear interceptors in axios
    axios.interceptors.request.clear();
    // setup new interceptors to add the token
    axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers = config.headers ?? {};

        if (serverToken && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${serverToken}`;
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }, [axios, serverToken]);
  useEffect(() => {
    const { activeServerGuid, servers } = serverSettings.state;

    // server settings have changed, update server address to the new one
    if (!activeServerGuid) {
      return;
    }

    const server = servers.find((x) => x.guid === activeServerGuid);

    if (!server) {
      return;
    }

    client.setBaseUrl(server.address);
    setServerToken(server.token);
  }, [client, serverSettings.state]);

  return (
    <BackendContext.Provider value={{ overrideServer, client }}>
      {children}
    </BackendContext.Provider>
  );
}

export const useBackendClient = () => useBackendContext().client;
export const useBackendContext = () => useContext(BackendContext);
