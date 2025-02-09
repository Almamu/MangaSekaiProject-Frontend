import { useActiveServer } from "@/hooks/useActiveServer";
import { useBackendClient } from "@/hooks/useBackend";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => {
  const activeServer = useActiveServer();
  const backend = useBackendClient();

  return useQuery({
    queryKey: ["dashboard", activeServer?.guid],
    queryFn: async () => {
      const result = await Promise.all([backend.listSeries()]);

      return {
        series: result[0],
      };
    },
  });
};
