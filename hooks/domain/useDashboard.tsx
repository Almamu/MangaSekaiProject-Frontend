import { useActiveServer } from "@/hooks/useActiveServer";
import { useBackendClient } from "@/hooks/useBackend";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { wait } from "@/utils/promise-utils";

export const useDashboard = () => {
  const activeServer = useActiveServer();
  const backend = useBackendClient();

  return useQuery({
    queryKey: ["dashboard", activeServer?.guid],
    queryFn: async (context: QueryFunctionContext) => {
      const result = await Promise.all([
        backend.recentlyUpdatedSeries(context.signal),
        wait(500000),
      ]);

      return {
        recentlyUpdated: result[0],
      };
    },
  });
};
