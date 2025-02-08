import { useServerSettings } from "@/hooks/useServerSettings";
import { Redirect } from "expo-router";

export default function Index() {
  const serverSettings = useServerSettings();

  if (serverSettings.state.servers.length === 0) {
    return <Redirect href="/startup/step1" />;
  }

  if (!serverSettings.state.activeServerGuid) {
    return <Redirect href="/server-select" />;
  } else {
    return <Redirect href="/home/dashboard" />;
  }
}
