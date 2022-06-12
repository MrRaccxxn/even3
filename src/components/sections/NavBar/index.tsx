import { ReactNode } from "react";
import {
  Box,
  Flex,
  Link,
  useDisclosure,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { ConnectWalletButton } from "../../atomic/ConnecWalletButton";
import Image from "next/image";
import { useRouter } from "next/router";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const route = useRouter();

  return (
    <>
      <Box
        width="100%"
        bg={"#171923"}
        height="80px"
        position={"fixed"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Flex
          maxW={"7xl"}
          width="100%"
          height="100%"
          alignItems={"center"}
          justifyContent={"space-between"}
          padding={"16px"}
        >
          <Box
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => {
              route.replace("/");
            }}
          >
            <Image
              src={"/img/logo.png"}
              width={160}
              height={38}
              alt={"Even3"}
            />
          </Box>

          <ConnectWalletButton />
        </Flex>
      </Box>
    </>
  );
}
