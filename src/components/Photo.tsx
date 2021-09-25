import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Image } from "@chakra-ui/image";
import { HStack, Spacer, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";

type Props = {
  urls: {
    large: string;
    regular: string;
    raw: string;
    small: string;
  };
};

export function InteractivePhoto({ urls }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image
        onClick={onOpen}
        src={urls.small}
        alt="yo"
        style={{ height: "200px" }}
        _hover={{
          border: "2px solid rgb(0, 161, 210) !important",
          filter: "drop-shadow(0 -2mm 10mm rgb(0, 161, 210)) !important",
          cursor: "pointer",
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent w="1000px">
          <ModalCloseButton />
          <HStack>
            <VStack pb=".9em">
              <Image src={urls.regular} />
              <Spacer />
              <HStack>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Share
                </Button>
                <Button colorScheme="green">Add to Vault</Button>
              </HStack>
            </VStack>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
}
