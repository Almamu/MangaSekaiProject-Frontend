import { Drawer } from "expo-router/drawer";
import { useServerSettings } from "@/hooks/useServerSettings";
import { Redirect } from "expo-router";

export default function Layout() {
  const serverSettings = useServerSettings();

  if (serverSettings.state.servers.length === 0) {
    return <Redirect href="/" />;
  }

  return (
    <Drawer>
      <Drawer.Screen name="server-select" />
    </Drawer>
  );
}
