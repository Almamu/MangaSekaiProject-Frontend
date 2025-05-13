import { ServerSettingsContextProvider } from "@/hooks/useServerSettings";
import { AxiosContextProvider } from "@/hooks/useAxios";
import { BackendContextProvider } from "@/hooks/useBackend";
import { AppTheme } from "@/components/parts/AppTheme";
import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const AppRoot = ({ children }: PropsWithChildren) => {
  return (
    <AppTheme>
      <ServerSettingsContextProvider>
        <AxiosContextProvider>
          <BackendContextProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </BackendContextProvider>
        </AxiosContextProvider>
      </ServerSettingsContextProvider>
    </AppTheme>
  );
};
