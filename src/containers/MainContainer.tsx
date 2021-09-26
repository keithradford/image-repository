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
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { BrowseContainer } from "./BrowseContainer";
import { AiFillGithub, AiFillPicture, AiOutlineSearch } from "react-icons/ai";
import { BsGear, BsPencil } from "react-icons/bs";
import { GiLockedChest } from "react-icons/gi";
import { VaultContainer } from "./VaultContainer";
import { useFirstVisit } from "../hooks/useFirstVists";
import { WelcomeContainer } from "./WelcomeContainer";
import { useSavedTags } from "../hooks/useSavedTags";
import { SearchContainer } from "./SearchContainer";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { useColorMode } from "@chakra-ui/color-mode";
import { mode } from "@chakra-ui/theme-tools";

export function MainContainer() {
  const { tags } = useSavedTags();
  const { colorMode, toggleColorMode } = useColorMode();

  const customMode = (
    light: string | JSX.Element,
    dark: string | JSX.Element
  ) => mode(light, dark)({ colorMode });

  const size = useBreakpointValue({ base: "sm", md: "lg" });
  const [activePage, setActivePage] = useState<"explore" | "search" | "vault">(
    "explore"
  );
  const { firstVisit, changeFirstVisit } = useFirstVisit();

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
            <Menu isLazy>
              <MenuButton
                aria-label="settings"
                isRound
                colorScheme="cyan"
                variant="ghost"
                size="lg"
                as={IconButton}
                icon={<BsGear />}
                mr="3em"
              />
              <MenuList>
                <MenuItem
                  onClick={changeFirstVisit}
                  icon={<BsPencil fontSize="20px" />}
                >
                  Edit Tags
                </MenuItem>
                <Center p=".2em" mt=".1em">
                  <IconButton
                    as="a"
                    target="_blank"
                    href="https://github.com/keithradford/image-repository"
                    aria-label="github"
                    colorScheme="cyan"
                    icon={<AiFillGithub fontSize="35px" />}
                    size="md"
                    isRound
                  />
                  <IconButton
                    ml="1em"
                    aria-label="toggle"
                    isRound
                    icon={customMode(
                      <MoonIcon fontSize="30px" />,
                      <SunIcon fontSize="30px" />
                    )}
                    size="md"
                    onClick={toggleColorMode}
                    colorScheme={customMode("purple", "orange")}
                  />
                </Center>
              </MenuList>
            </Menu>
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
              size={size}
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
        tags.map((tag) => <BrowseContainer query={tag} />)}
      {activePage === "vault" && <VaultContainer />}
    </>
  );
}
