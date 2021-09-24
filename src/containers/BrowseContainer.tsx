import { Box, Center } from "@chakra-ui/layout";
import { GallerySlider } from "../components/GallerySlider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePhotos } from "../hooks/usePhotos";
import { Spinner } from "@chakra-ui/spinner";

type Props = {
  query: string;
};

export function BrowseContainer({ query }: Props) {
  const photos = usePhotos(query);

  return (
    <Box overflowX="hidden" my="2em">
      {photos.status === "loaded" ? (
        <GallerySlider photos={photos.data} />
      ) : (
        <Center w="100%" h="100%">
          <Spinner size="xl" />
        </Center>
      )}
    </Box>
  );
}
