import { createContext, PropsWithChildren, useContext } from "react";
import axios, { AxiosInstance } from "axios";

const instance = axios.create();

export const AxiosContext = createContext<AxiosInstance>(instance);

export function AxiosContextProvider({ children }: PropsWithChildren) {
  return (
    <AxiosContext.Provider value={instance}>{children}</AxiosContext.Provider>
  );
}

export const useAxios = () => useContext(AxiosContext);
