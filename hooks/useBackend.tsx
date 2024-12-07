import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Client, IClient } from "@/domain/backend";
import { useAxios } from "@/hooks/useAxios";
import { useServerSettings } from "@/hooks/useServerSettings";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

interface ContextProps {
  overrideServer(address: string, token?: string): void;
  client: IClient;
}

export const BackendContext = createContext<ContextProps>({} as ContextProps);

export function BackendContextProvider({ children }: PropsWithChildren) {
  const axios = useAxios();
  const serverSettings = useServerSettings();
  const [serverAddress, setServerAddress] = useState<string | null>(null);
  const [serverToken, setServerToken] = useState<string | null>(null);
  const client = useMemo(() => {
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

    return new Client(serverAddress ?? "", axios);
  }, [axios, serverAddress, serverToken]);
  const overrideServer = useCallback(
    (address: string, token?: string) => {
      setServerAddress(address);
      setServerToken(token ? token : null);
    },
    [setServerAddress, setServerToken]
  );

  useEffect(() => {
    const { activeServerId, servers } = serverSettings.state;

    // server settings have changed, update server address to the new one
    if (activeServerId) {
      const { address, token } = servers[activeServerId];

      setServerAddress(address);
      setServerToken(token ? token : null);
    }
  }, [serverSettings]);

  return (
    <BackendContext.Provider value={{ overrideServer, client }}>
      {children}
    </BackendContext.Provider>
  );
}

export const useBackendClient = () => useContext(BackendContext).client;
export const useBackendContext = () => useContext(BackendContext);
