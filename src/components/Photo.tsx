import { TwitterShareButton } from "react-share";
import { useDisclosure } from "@chakra-ui/hooks";
import { Image } from "@chakra-ui/image";
import { HStack, Spacer, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useSavedPhotos } from "../hooks/useSavedPhotos";
import { Photo } from "../lib/types";
import { Button } from "@chakra-ui/button";

type Props = {
  photo: Photo;
};

export function InteractivePhoto({ photo }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addPhoto, deletePhoto, contains } = useSavedPhotos();

  return (
    <>
      <Image
        onClick={onOpen}
        src={photo.urls.small}
        style={{ height: "200px" }}
        _hover={{
          border: "2px solid rgb(0, 161, 210) !important",
          filter: "drop-shadow(0 -2mm 2mm rgb(0, 161, 210)) !important",
          cursor: "pointer",
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent w="1000px" data-testid="modal">
          <ModalCloseButton />
          <HStack>
            <VStack pb=".9em">
              <Image src={photo.urls.regular} />
              <Spacer />
              <HStack>
                <TwitterShareButton
                  url="https://immense-anchorage-96448.herokuapp.com/"
                  title={`Check out this picture! ${photo.urls.regular}`}
                >
                  <Button colorScheme="cyan">Share on Twitter</Button>
                </TwitterShareButton>
                <Button
                  colorScheme={contains(photo.id) ? "red" : "green"}
                  onClick={
                    contains(photo.id)
                      ? () => deletePhoto(photo)
                      : () => addPhoto(photo)
                  }
                >
                  {contains(photo.id) ? "Remove from Vault" : "Add to Vault"}
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
}
