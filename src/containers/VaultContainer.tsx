import { Center, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { InteractivePhoto } from "../components/Photo";
import { useSavedPhotos } from "../hooks/useSavedPhotos";

export function VaultContainer() {
  const { photos } = useSavedPhotos();

  return (
    <Center overflow="hidden" mx="2em">
      {photos.length > 0 ? (
        <Wrap mt="3em">
          {photos.map((photo) => (
            <WrapItem key={photo.id}>
              <InteractivePhoto photo={photo} />
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Text mt="5em">
          There's nothing here! Add photos to your vault by clicking on them in
          the <Text as="strong">EXPLORE</Text> or{" "}
          <Text as="strong">SEARCH</Text> tabs.
        </Text>
      )}
    </Center>
  );
}
