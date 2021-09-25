import { CloseButton } from "@chakra-ui/close-button";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { PropsWithChildren } from "react";

type Props = {
  onRemove?: () => void;
};

export function Tag({ onRemove, children }: PropsWithChildren<Props>) {
  return (
    <Box
      bgColor="gray.700"
      py=".3em"
      px="1em"
      w="fit-content"
      borderRadius="2em"
    >
      <HStack>
        <Text>{children}</Text>
        <CloseButton size="sm" />
      </HStack>
    </Box>
  );
}
