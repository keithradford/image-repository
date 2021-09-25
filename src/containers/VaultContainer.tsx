import { Image } from "@chakra-ui/image";
import { Box, Center, Container, Wrap, WrapItem } from "@chakra-ui/layout";
import { InteractivePhoto } from "../components/Photo";
import { useSavedPhotos } from "../hooks/useSavedPhotos";

export function VaultContainer() {
  const { photos } = useSavedPhotos();
  return (
    <Center overflow="hidden" mx="2em">
      <Wrap mt="3em">
        {photos.map((photo) => (
          <WrapItem>
            <InteractivePhoto photo={photo} />
          </WrapItem>
        ))}
      </Wrap>
    </Center>
  );
}
