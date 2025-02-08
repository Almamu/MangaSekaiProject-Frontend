import { Pressable, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useActiveServer } from "@/hooks/useActiveServer";
import { HorizontalLayout, VerticalLayout } from "@/components/ui/View";
import { Icon } from "@/components/ui/Icon";
import { useState } from "react";
import { ServerEntry, useServerSettings } from "@/hooks/useServerSettings";

type EntryItemProps = {
  server: ServerEntry;
};

const EntryItem = ({ server }: EntryItemProps) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={{
        flex: 1,
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderStyle: "solid",
        backgroundColor: colors.primary100,
      }}
    >
      <HorizontalLayout>
        <Text style={{ flex: 1, color: colors.textDark }}>
          {server.friendlyName ?? server.address}
        </Text>
      </HorizontalLayout>
    </Pressable>
  );
};

type TitleEntryProps = {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
};

const TitleEntry = ({ expanded, setExpanded }: TitleEntryProps) => {
  const { colors } = useTheme();
  const activeServer = useActiveServer();

  return (
    <Pressable
      style={{
        flex: 1,
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: colors.primary100,
        backgroundColor: colors.primary,
      }}
      onPress={() => setExpanded(!expanded)}
    >
      <HorizontalLayout>
        <Text style={{ flex: 1, color: colors.textLight }}>
          {activeServer?.friendlyName ?? activeServer?.address}
        </Text>

        <Icon icon="chevron-down" />
      </HorizontalLayout>
    </Pressable>
  );
};

const AddServer = () => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={{
        flex: 1,
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: colors.primary100,
        backgroundColor: colors.analogous2,
      }}
    >
      <HorizontalLayout>
        <Text style={{ flex: 1, color: colors.textDark }}>Añadir servidor</Text>
        <Pressable>
          <Icon icon="plus" />
        </Pressable>
      </HorizontalLayout>
    </Pressable>
  );
};

export const ServerSelector = () => {
  const { colors } = useTheme();
  const serverSettings = useServerSettings();
  const activeServer = useActiveServer();
  const [expanded, setExpanded] = useState(false);

  return (
    <VerticalLayout style={{ backgroundColor: colors.primary100, gap: 0 }}>
      <TitleEntry expanded={expanded} setExpanded={setExpanded} />
      {expanded ? (
        <VerticalLayout>
          {serverSettings.state.servers
            .filter((x) => x.guid !== activeServer?.guid)
            .map((x) => (
              <EntryItem key={x.guid} server={x} />
            ))}
          <AddServer />
        </VerticalLayout>
      ) : (
        <></>
      )}
    </VerticalLayout>
  );
};
