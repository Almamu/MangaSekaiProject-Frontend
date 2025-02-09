import { Text } from "@/components/ui/Text";
import { useDashboard } from "@/hooks/domain/useDashboard";

export default function Index() {
  const { isLoading, data } = useDashboard();

  if (isLoading || !data) {
    return <Text>Loading view...</Text>;
  } else {
    return data.series.data.map((x) => <Text key={x.id}>{x.name}</Text>);
  }
}
