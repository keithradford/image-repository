import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Center, Wrap, WrapItem } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { useCallback, useState } from "react";
import { InteractivePhoto } from "../components/Photo";
import { usePhotos } from "../hooks/usePhotos";

export function SearchContainer() {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const photos = usePhotos(searchQuery);

  const onClick = () => setSearchQuery(input);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setInput(event.target.value),
    []
  );

  return (
    <>
      <Container mt="2em">
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
      </Container>
      <Center overflow="hidden" mx="2em" my="2em">
        {photos.status !== "loaded" ? (
          <Spinner />
        ) : (
          <Wrap mt="3em">
            {photos.data.map((photo) => (
              <WrapItem>
                <InteractivePhoto photo={photo} />
              </WrapItem>
            ))}
          </Wrap>
        )}
      </Center>
    </>
  );
}
