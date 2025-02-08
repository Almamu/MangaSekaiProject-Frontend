import { useServerSettings } from "@/hooks/useServerSettings";
import { useMemo } from "react";

export const useActiveServer = () => {
  const serverSettings = useServerSettings();
  return useMemo(
    () =>
      serverSettings.state.servers.find(
        (x) => x.guid === serverSettings.state.activeServerGuid
      ),
    [serverSettings]
  );
};
