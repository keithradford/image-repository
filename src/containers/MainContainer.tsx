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
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { BrowseContainer } from "./BrowseContainer";
import { AiFillPicture, AiOutlineSearch } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { GiLockedChest } from "react-icons/gi";
import { VaultContainer } from "./VaultContainer";
import { useFirstVisit } from "../hooks/useFirstVists";
import { WelcomeContainer } from "./WelcomeContainer";
import { useSavedTags } from "../hooks/useSavedTags";

export function MainContainer() {
  const { tags } = useSavedTags();

  const [activePage, setActivePage] = useState<"explore" | "search" | "vault">(
    "explore"
  );
  const { firstVisit } = useFirstVisit();
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const onClick = () => setSearchQuery(input);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setInput(event.target.value),
    []
  );

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
          {activePage === "search" && (
            <>
              <InputGroup>
                <Input
                  w="100%"
                  size="lg"
                  variant="flushed"
                  placeholder="Try searching 'shopify'"
                  onChange={handleChange}
                />
                <InputRightElement>
                  <Button
                    disabled={input.length < 2}
                    size="sm"
                    aria-label="search"
                    colorScheme="green"
                    onClick={onClick}
                  >
                    GO!
                  </Button>
                </InputRightElement>
              </InputGroup>
            </>
          )}
        </VStack>
      </Center>
      {activePage === "search" && searchQuery && (
        <BrowseContainer query={searchQuery} />
      )}
      {activePage === "explore" &&
        tags.map((tag) => <BrowseContainer query={tag} />)}
      {activePage === "vault" && <VaultContainer />}
    </>
  );
}
