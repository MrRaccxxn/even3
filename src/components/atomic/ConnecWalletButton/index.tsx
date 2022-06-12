import { Box, Button, Icon, Stack, Text, Tooltip } from "@chakra-ui/react";
import { parseFixed } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/User.context";
import { BsFillPersonFill } from "react-icons/bs";
import { useRouter } from "next/router";

export const ConnectWalletButton = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { account, setAccount, balance, setBalance } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        let chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        const rinkebyChainId = "0x4";

        if (chainId !== rinkebyChainId) {
          alert("You are not connected to the Rinkeby Test Network!");
          return;
        }

        setAccount(res[0]);
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [res[0].toString(), "latest"],
        });
        setBalance(parseFloat(ethers.utils.formatEther(balance)));
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const accountsChanged = async (newAccount: string) => {
    setAccount(newAccount.toString());
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(parseFloat(ethers.utils.formatEther(balance)));
    } catch (err) {
      console.error(err);
      setErrorMessage("There was a problem connecting to MetaMask");
    }
  };

  const chainChanged = () => {
    setErrorMessage("");
    setAccount("");
    setBalance(0);
  };

  return account ? (
    <Stack direction={"row"} alignItems={"center"}>
      <Box
        display="flex"
        alignItems="center"
        background="gray.700"
        borderRadius="xl"
        py="0"
      >
        <Box px="3">
          <Text color="white" fontSize="md">
            {balance && parseFloat(balance.toString()).toFixed(3)} ETH
          </Text>
        </Box>
        <Button
          bg="gray.800"
          border="1px solid transparent"
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "blue.400",
            backgroundColor: "gray.700",
          }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px"
        >
          <Text color="white" fontSize="md" fontWeight="medium" mr="2">
            {account &&
              `${account.slice(0, 6)}...${account.slice(
                account.length - 4,
                account.length
              )}`}
          </Text>
        </Button>
      </Box>

      <Icon
        as={BsFillPersonFill}
        w={8}
        h={8}
        color={"white"}
        _hover={{
          cursor: "pointer",
        }}
        onClick={() => router.push("/event")}
      />
    </Stack>
  ) : (
    <Button
      onClick={() => connectHandler()}
      bg="blue.800"
      color="whiteAlpha.900"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="xl"
      border="1px solid transparent"
      _hover={{
        borderColor: "blue.700",
        color: "blue.200",
      }}
      _active={{
        backgroundColor: "blue.800",
        borderColor: "blue.700",
      }}
    >
      Connect Wallet
    </Button>
  );
};
