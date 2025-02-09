import { Slot, SplashScreen } from "expo-router";

import { init } from "@/i18n";
import React from "react";
import { AppRoot } from "@/components/parts/AppRoot";

SplashScreen.preventAutoHideAsync();

if (typeof window !== "undefined") {
  init();
}

export default function Root() {
  return (
    <AppRoot>
      <Slot />
    </AppRoot>
  );
}
