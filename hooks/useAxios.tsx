import { createContext, PropsWithChildren, useContext } from "react";
import axios, { AxiosInstance } from "axios";

export const AxiosContext = createContext<AxiosInstance>(axios.create());

const axiosValue = axios.create();

export function AxiosContextProvider({ children }: PropsWithChildren) {
  return (
    <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
  );
}

export const useAxios = () => useContext(AxiosContext);
