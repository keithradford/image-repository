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
import { Tag } from "../components/Tag";

export function WelcomeContainer() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const onClick = () => {
    if (!tags.find((tag) => tag === input)) {
      setTags([...tags, input]);
      setInput("");
    }
  };

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
                disabled={input.length < 2}
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
            <Wrap my="1em" p="1em" bgColor="#e4e4e4" borderRadius=".3em">
              {tags.map((tag) => (
                <WrapItem>
                  <Tag>{tag}</Tag>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Flex>
      </Center>
    </Container>
  );
}
