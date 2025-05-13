import { Skeleton } from "react-native-skeletons";
import { VerticalLayout } from "@/components/ui/View";
import styled from "styled-components/native";

const Container = styled.View`
  justify-content: flex-start;
  gap: 16px;
  flex-direction: row;
`;

const SkeletonContainer = styled(VerticalLayout)`
  width: ${({
    theme: {
      sizes: {
        cover: { width },
      },
    },
  }) => width}px;
`;

const SkeletonCover = styled(Skeleton)`
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

const SkeletonTitle = styled(Skeleton)`
  width: ${({
    theme: {
      sizes: {
        cover: { width },
      },
    },
  }) => width}px;
  height: ${({
    theme: {
      fonts: { regular },
    },
  }) => regular.fontSize}px;
`;

const SkeletonChapters = styled(Skeleton)`
  width: ${({
    theme: {
      sizes: {
        cover: { width },
      },
    },
  }) => width}px;
  height: ${({
    theme: {
      fonts: { small },
    },
  }) => small.fontSize}px;
`;

export const LoaderSkeleton = () => {
  return (
    <Container>
      {[...Array(4)].map((_, index) => (
        <SkeletonContainer key={index}>
          <SkeletonCover />
          <SkeletonTitle />
          <SkeletonChapters />
        </SkeletonContainer>
      ))}
    </Container>
  );
};
