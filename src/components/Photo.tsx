import { Image } from "@chakra-ui/image";

export function InteractivePhoto({ src }: { src: string }) {
  return (
    <>
      <img src={src} alt="yo" style={{ maxHeight: "200px" }} />
    </>
  );
}
