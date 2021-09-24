import { Button, ButtonGroup } from "@chakra-ui/button";
import { Center, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { BrowseContainer } from "../components/BrowseContainer";

export function MainContainer() {
  return (
    <>
      <Center my="2em" overflowX="hidden">
        <VStack>
          <Heading>myPics</Heading>
          <HStack>
            <ButtonGroup variant="ghost" isAttached>
              <Button isActive>BROWSE</Button>
              <Button variant="ghost">VAULT</Button>
            </ButtonGroup>
          </HStack>
        </VStack>
      </Center>
      <BrowseContainer />
    </>
  );
}
