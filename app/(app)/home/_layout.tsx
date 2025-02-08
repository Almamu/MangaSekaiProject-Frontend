import { useServerSettings } from "@/hooks/useServerSettings";
import { Redirect } from "expo-router";
import { MobileDashboard } from "@/components/parts/layouts/MobileDashboard";

export default function Layout() {
  const serverSettings = useServerSettings();

  if (serverSettings.state.servers.length === 0) {
    return <Redirect href="/" />;
  }

  return <MobileDashboard />;
}
