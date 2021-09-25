import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {
  Center,
  Container,
  Flex,
  Heading,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/layout";
import { useCallback, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Tag } from "../components/Tag";
import { useFirstVisit } from "../hooks/useFirstVists";
import { useSavedTags } from "../hooks/useSavedTags";

export function WelcomeContainer() {
  const [input, setInput] = useState("");
  const { changeFirstVisit } = useFirstVisit();
  const { tags, addTag, deleteTag, contains } = useSavedTags();

  const onClick = () => {
    if (!contains(input)) {
      addTag(input);
      setInput("");
    }
  };

  const handleDelete = useCallback(
    (tag: string) => {
      deleteTag(tag);
    },
    [deleteTag]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setInput(event.target.value),
    []
  );

  return (
    <Container pt="10em">
      <Center>
        <Flex direction="column" textAlign="center">
          <Heading>
            welcome to{" "}
            <Text as="strong" color="cyan">
              {" "}
              myPics
            </Text>
            !
          </Heading>
          <Text my="1em" fontSize="1.2em">
            type in some topics you'd be interested in viewing and continue to
            the site to start browsing
          </Text>
          <InputGroup>
            <Input
              value={input}
              variant="flushed"
              placeholder="Try entering 'cats'"
              onChange={handleChange}
            />
            <InputRightElement>
              <Button
                disabled={input.length < 2 || contains(input)}
                size="xs"
                aria-label="search"
                colorScheme="green"
                onClick={onClick}
              >
                ADD!
              </Button>
            </InputRightElement>
          </InputGroup>
          {tags.length > 0 && (
            <Wrap
              my="1em"
              p="1em"
              bgColor="rgba(228, 228, 228, 0.699)"
              borderRadius=".3em"
            >
              {tags.map((tag) => (
                <WrapItem>
                  <Tag tag={tag} handleDelete={handleDelete} />
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Flex>
      </Center>
      {tags.length > 0 && (
        <Center mt="1.6em">
          <Button
            variant="link"
            colorScheme="cyan"
            size="lg"
            rightIcon={<BsChevronRight />}
            onClick={changeFirstVisit}
          >
            Continue to site
          </Button>
        </Center>
      )}
    </Container>
  );
}
