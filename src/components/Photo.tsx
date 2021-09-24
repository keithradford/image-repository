import { Image } from "@chakra-ui/image";

export function InteractivePhoto({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="yo"
      style={{ height: "200px" }}
      _hover={{
        height: "250px !important",
        filter: "drop-shadow(0 -2mm 10mm rgb(160, 0, 210)) !important",
      }}
    />
  );
}
