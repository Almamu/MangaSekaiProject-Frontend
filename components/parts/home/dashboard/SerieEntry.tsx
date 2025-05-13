import styled from "styled-components/native";
import { VerticalLayout } from "@/components/ui/View";
import { ISeriesListItem } from "@/domain/backend";
import { Image } from "expo-image";
import { RegularText } from "@/components/ui/Text/RegularText";
import { SmallText } from "@/components/ui/Text/SmallText";

interface Props {
  serie: ISeriesListItem;
}

const Container = styled(VerticalLayout)`
  width: ${({
    theme: {
      sizes: {
        cover: { width },
      },
    },
  }) => width}px;
  align-items: flex-start;
`;

const Cover = styled(Image)`
  width: ${({
    theme: {
      sizes: {
        cover: { width },
      },
    },
  }) => width}px;

  height: ${({
    theme: {
      sizes: {
        cover: { height },
      },
    },
  }) => height}px;
`;
const Title = RegularText;
const ChapterCount = SmallText;

export const SerieEntry = ({ serie }: Props) => {
  return (
    <Container>
      <Cover
        source={
          serie.image_url
            ? {
                uri: serie.image_url,
              }
            : require("@/assets/images/default_cover.png")
        }
        contentFit="contain"
      />
      <Title numberOfLines={1}>{serie.name}</Title>
      <ChapterCount>{serie.chapter_count} chapters</ChapterCount>
    </Container>
  );
};
