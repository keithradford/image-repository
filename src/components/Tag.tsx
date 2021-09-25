import { CloseButton } from "@chakra-ui/close-button";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { useCallback } from "react";

type Props = {
  handleDelete: (tag: string) => void;
  tag: string;
};

export function Tag({ handleDelete, tag }: Props) {
  const onDelete = useCallback(() => {
    handleDelete(tag);
  }, [handleDelete, tag]);

  return (
    <Box
      bgColor="gray.700"
      py=".3em"
      px="1em"
      w="fit-content"
      borderRadius="2em"
    >
      <HStack>
        <Text>{tag}</Text>
        <CloseButton size="sm" onClick={onDelete} />
      </HStack>
    </Box>
  );
}
