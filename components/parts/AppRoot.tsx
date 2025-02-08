import { ServerSettingsContextProvider } from "@/hooks/useServerSettings";
import { AxiosContextProvider } from "@/hooks/useAxios";
import { BackendContextProvider } from "@/hooks/useBackend";
import { AppTheme } from "@/components/AppTheme";
import { Slot } from "expo-router";
import React from "react";

export const AppRoot = () => {
  return (
    <ServerSettingsContextProvider>
      <AxiosContextProvider>
        <BackendContextProvider>
          <AppTheme>
            <Slot />
          </AppTheme>
        </BackendContextProvider>
      </AxiosContextProvider>
    </ServerSettingsContextProvider>
  );
};
