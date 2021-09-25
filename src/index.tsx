import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { MainContainer } from "./containers/MainContainer";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./lib/theme";
import { WelcomeContainer } from "./containers/WelcomeContainer";

require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <WelcomeContainer />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
