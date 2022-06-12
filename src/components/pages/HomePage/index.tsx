import { Box } from "@chakra-ui/react";
import Hero from "../../sections/Hero";
import NavBar from "../../sections/NavBar";

export const HomePage = () => {
  return (
    <Box width={"100%"} height={"100%"}>
      <NavBar />
      <Box>
        <Box
          width={"100vw"}
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Hero />
        </Box>
      </Box>
    </Box>
  );
};
