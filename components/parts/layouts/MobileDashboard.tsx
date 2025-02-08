import { Drawer } from "expo-router/drawer";
import { View } from "react-native";
import { DrawerContent } from "@react-navigation/drawer";
import { ServerSelector } from "@/components/parts/drawer/ServerSelector";

export const MobileDashboard = () => {
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
};
