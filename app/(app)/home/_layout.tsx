import { Drawer } from "expo-router/drawer";
import { useServerSettings } from "@/hooks/useServerSettings";
import { Redirect } from "expo-router";
import { View } from "react-native";
import { DrawerContent } from "@react-navigation/drawer";
import ServerSelector from "@/components/parts/drawer/ServerSelector";

export default function Layout() {
  const serverSettings = useServerSettings();

  if (serverSettings.state.servers.length === 0) {
    return <Redirect href="/" />;
  }

  return (
    <Drawer
      drawerContent={(props) => (
        <View>
          <ServerSelector />
          <DrawerContent {...props} />
        </View>
      )}
    >
      <Drawer.Screen name="dashboard" options={{ title: "Dashboard" }} />
    </Drawer>
  );
}
