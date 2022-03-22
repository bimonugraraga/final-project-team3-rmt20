import React from "react";
import { Box, Center, NativeBaseProvider } from "native-base";
// import { LinearGradient } from "expo-linear-gradient";
const LinearGradient = require("expo-linear-gradient").LinearGradient;

const App = () => {
  return <Box bg={{
    linearGradient: {
      colors: ["#191645", "#43C6AC"],
      start: [0, 0],
      end: [0, 1]
    }
  }} p={12} rounded="lg" _text={{
    fontSize: "md",
    fontWeight: "bold",
    color: "white"
  }}>
      This is a Box with Linear Gradient
    </Box>;
};

const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

function Example() {
  return <NativeBaseProvider config={config}>
      <Center >
        <App />
      </Center>
    </NativeBaseProvider>;
}

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
                <Example />
                <Example />
                <Example />
                <Example />
            </Center>
          </NativeBaseProvider>
        );
    };
    