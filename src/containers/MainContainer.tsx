import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/layout";
import { useState } from "react";
import { BrowseContainer } from "./BrowseContainer";
import { AiFillPicture, AiOutlineSearch } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { GiLockedChest } from "react-icons/gi";
import { VaultContainer } from "./VaultContainer";
import { useFirstVisit } from "../hooks/useFirstVists";
import { WelcomeContainer } from "./WelcomeContainer";
import { useSavedTags } from "../hooks/useSavedTags";
import { SearchContainer } from "./SearchContainer";

export function MainContainer() {
  const { tags } = useSavedTags();

  const [activePage, setActivePage] = useState<"explore" | "search" | "vault">(
    "explore"
  );
  const { firstVisit } = useFirstVisit();

  if (firstVisit) return <WelcomeContainer />;

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" w="100%" my="2em">
        <GridItem colStart={2} justifyContent="center">
          <Center>
            <Heading size="4xl">myPics</Heading>
          </Center>
        </GridItem>
        <GridItem colStart={3}>
          <Box justifyContent="right" w="100%" display="flex">
            <IconButton
              aria-label="settings"
              isRound
              colorScheme="cyan"
              variant="ghost"
              size="lg"
              icon={<BsGear />}
              mr="3em"
            />
          </Box>
        </GridItem>
      </Grid>
      <Center overflowX="hidden">
        <VStack spacing="2em">
          <HStack>
            <ButtonGroup
              colorScheme="cyan"
              variant="ghost"
              isAttached
              size="lg"
            >
              <Button
                isActive={activePage === "explore"}
                onClick={() => setActivePage("explore")}
                rightIcon={<AiFillPicture />}
              >
                EXPLORE
              </Button>
              <Button
                isActive={activePage === "search"}
                onClick={() => setActivePage("search")}
                rightIcon={<AiOutlineSearch />}
              >
                SEARCH
              </Button>
              <Button
                isActive={activePage === "vault"}
                onClick={() => setActivePage("vault")}
                rightIcon={<GiLockedChest />}
              >
                VAULT
              </Button>
            </ButtonGroup>
          </HStack>
        </VStack>
      </Center>
      {activePage === "search" && <SearchContainer />}
      {activePage === "explore" &&
        tags.map((tag, i) => (
          <BrowseContainer query={tag} direction={i % 2 === 0} />
        ))}
      {activePage === "vault" && <VaultContainer />}
    </>
  );
}
