import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

export const theme = extendTheme({
  config,
  styles: {
    global: () => ({
      ":focus:not(:focus-visible)": {
        boxShadow: "none !important",
      },

      ".slick-dots li button": {
        bgColor: "white !important",
        borderRadius: "50%",
      },
    }),
  },
});
