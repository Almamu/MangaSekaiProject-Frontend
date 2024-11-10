import { version } from "./package.json";
import buildNumber from "./app.version.json";

export default {
  expo: {
    name: "mangasekaiproject-frontend",
    slug: "mangasekaiproject-frontend",
    version: version,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      buildNumber: buildNumber.toString(),
      supportsTablet: true,
    },
    android: {
      versionCode: buildNumber,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-localization"],
    experiments: {
      typedRoutes: true,
    },
  },
};
