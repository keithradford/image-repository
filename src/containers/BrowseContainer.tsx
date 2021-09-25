import { Box, Center, Heading } from "@chakra-ui/layout";
import { GallerySlider } from "../components/GallerySlider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePhotos } from "../hooks/usePhotos";
import { Spinner } from "@chakra-ui/spinner";

type Props = {
  query: string;
  direction: boolean;
};

export function BrowseContainer({ query, direction }: Props) {
  const photos = usePhotos(query);

  return (
    <Box overflowX="hidden" my="4em" h="20em">
      <Heading ml=".2em">{query.toUpperCase()}</Heading>
      {photos.status === "loaded" ? (
        <GallerySlider photos={photos.data} direction={direction} />
      ) : (
        <Center w="100%" h="100%">
          <Spinner size="xl" />
        </Center>
      )}
    </Box>
  );
}
