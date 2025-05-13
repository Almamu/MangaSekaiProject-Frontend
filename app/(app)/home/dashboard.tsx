import { useDashboard } from "@/hooks/domain/useDashboard";
import { LoaderSkeleton } from "@/components/parts/home/dashboard/LoaderSkeleton";
import { SectionTitle } from "@/components/parts/home/dashboard/SectionTitle";
import styled from "styled-components/native";
import { SerieEntry } from "@/components/parts/home/dashboard/SerieEntry";
import { ScreenRootView } from "@/components/ui/View";

const Container = styled.View`
  gap: 32px;
`;

const Section = styled.View`
  align-items: flex-start;
`;

const SectionContent = styled.ScrollView``;

export default function Index() {
  const { isLoading, data } = useDashboard();

  return (
    <ScreenRootView edges={["left", "right", "bottom"]}>
      <Container>
        <Section>
          <SectionTitle>Continue reading...</SectionTitle>

          <SectionContent
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ gap: 16, marginBottom: 10 }}
          >
            {isLoading ? <LoaderSkeleton /> : <></>}
          </SectionContent>
        </Section>
        {isLoading || (data?.recentlyUpdated.length ?? 0) > 0 ? (
          <Section>
            <SectionTitle>Recently updated</SectionTitle>

            <SectionContent
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{ gap: 16, marginBottom: 10 }}
            >
              {isLoading ? (
                <LoaderSkeleton />
              ) : (
                data?.recentlyUpdated.map((x) => (
                  <SerieEntry serie={x} key={x.id} />
                ))
              )}
            </SectionContent>
          </Section>
        ) : (
          <></>
        )}
      </Container>
    </ScreenRootView>
  );
}
