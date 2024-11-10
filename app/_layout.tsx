import { Slot, SplashScreen } from "expo-router";
import { AppTheme } from "@/components/AppTheme";

import { init } from "@/i18n";
import { ServerSettingsContextProvider } from "@/hooks/useServerSettings";

SplashScreen.preventAutoHideAsync();

if (typeof window !== "undefined") {
  init();
}

export default function Root() {
  return (
    <ServerSettingsContextProvider>
      <AppTheme>
        <Slot initialRouteName="startup/index" />
      </AppTheme>
    </ServerSettingsContextProvider>
  );
}
