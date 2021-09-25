import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Center, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { BrowseContainer } from "./BrowseContainer";
import { AiFillPicture, AiOutlineSearch } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { GiLockedChest } from "react-icons/gi";

export function MainContainer() {
  const tags = ["cat", "dog", "bird", "hockey", "bread"];

  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const onClick = () => setSearchQuery(input);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setInput(event.target.value),
    []
  );

  return (
    <>
      <Center mt="2em" overflowX="hidden">
        <VStack spacing="2em">
          <HStack>
            <Heading size="4xl">myPics</Heading>
            <IconButton aria-label="settings" icon={<BsGear />} />
          </HStack>
          <HStack>
            <ButtonGroup
              colorScheme="cyan"
              variant="ghost"
              isAttached
              size="lg"
            >
              <Button isActive rightIcon={<AiFillPicture />}>
                EXPLORE
              </Button>
              <Button rightIcon={<AiOutlineSearch />}>SEARCH</Button>
              <Button variant="ghost" rightIcon={<GiLockedChest />}>
                VAULT
              </Button>
            </ButtonGroup>
          </HStack>
          <InputGroup>
            <Input
              w="100%"
              size="lg"
              variant="flushed"
              placeholder="Try searching 'cat'"
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
        </VStack>
      </Center>
      {searchQuery && <BrowseContainer query={searchQuery} />}
      {tags.map((tag) => (
        <BrowseContainer query={tag} />
      ))}
    </>
  );
}
