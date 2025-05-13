import { useServerSettings } from "@/hooks/useServerSettings";
import { Redirect, Slot } from "expo-router";
import { useWindowDimensions } from "react-native";
import { MobileDashboard } from "@/components/parts/layouts/MobileDashboard";
import styled from "styled-components/native";
import { useState } from "react";
import { HorizontalLayout, VerticalLayout } from "@/components/ui/View";

const Container = styled(HorizontalLayout)`
  align-items: flex-start;
  flex-grow: 1;
`;

const LeftPanel = styled(VerticalLayout)<{ $expanded: boolean }>`
  width: ${({ $expanded }) => ($expanded ? "480px" : "0px")};
  border-right: 1px solid ${({ theme }) => theme.colors.primary100};
  background-color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
  min-height: 100%;
`;

const ContentPanel = styled(VerticalLayout)`
  padding: 6px;
  flex-shrink: 1;
`;

export default function Layout() {
  const serverSettings = useServerSettings();
  const dimensions = useWindowDimensions();
  const [drawerExpanded, _setDrawerExpanded] = useState(true);

  if (serverSettings.state.servers.length === 0) {
    return <Redirect href="/" />;
  }

  if (dimensions.width < 768) {
    return <MobileDashboard />;
  } else {
    return (
      <Container>
        <LeftPanel $expanded={drawerExpanded} />
        <ContentPanel>
          <Slot />
        </ContentPanel>
      </Container>
    );
  }
}
