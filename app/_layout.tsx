import { Slot, SplashScreen } from "expo-router";
import { AppTheme } from "@/components/AppTheme";

import { init } from "@/i18n";
import { ServerSettingsContextProvider } from "@/hooks/useServerSettings";
import { AxiosContextProvider } from "@/hooks/useAxios";
import React from "react";
import { BackendContextProvider } from "@/hooks/useBackend";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

if (typeof window !== "undefined") {
  init();
}

export default function Root() {
  return (
    <GestureHandlerRootView>
      <ServerSettingsContextProvider>
        <AxiosContextProvider>
          <BackendContextProvider>
            <AppTheme>
              <Slot />
            </AppTheme>
          </BackendContextProvider>
        </AxiosContextProvider>
      </ServerSettingsContextProvider>
    </GestureHandlerRootView>
  );
}
