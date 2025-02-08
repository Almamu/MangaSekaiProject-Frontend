import { useServerSettings } from "@/hooks/useServerSettings";
import { Redirect, Slot } from "expo-router";
import { useWindowDimensions } from "react-native";
import { MobileDashboard } from "@/components/parts/layouts/MobileDashboard";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-grow: 1;
`;

const LeftPanel = styled.div<{ $expanded: boolean }>`
  width: ${({ $expanded }) => ($expanded ? "360px" : "0px")};
  border-right: 1px solid ${({ theme }) => theme.colors.primary100};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const ContentPanel = styled.div`
  flex-grow: 1;
  padding: 6px;
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
