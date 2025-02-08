import { SplashScreen } from "expo-router";

import { init } from "@/i18n";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppRoot } from "@/components/parts/AppRoot";

SplashScreen.preventAutoHideAsync();

if (typeof window !== "undefined") {
  init();
}

export default function Root() {
  return (
    <GestureHandlerRootView>
      <AppRoot />
    </GestureHandlerRootView>
  );
}
