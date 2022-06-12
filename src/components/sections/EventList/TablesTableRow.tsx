import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function TablesTableRow(props: any) {
  const status = "Online";
  const { eventAddress, eventId, eventName, isLast } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const router = useRouter();

  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : ""}
      >
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="xl" color="whiteAlpha.800" fontWeight="normal">
            {eventName}
          </Text>
        </Flex>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : ""}>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          Rinkeby
        </Text>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : ""}>
        <Badge
          bg={status === "Online" ? "green.400" : bgStatus}
          color={status === "Online" ? "white" : "white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>
      <a
        href={`https://rinkeby.etherscan.io/address/${eventAddress}`}
        target="_blank"
        rel="noreferrer"
      >
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : ""}>
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            pb=".5rem"
            alignItems={"center"}
          >
            {eventAddress}
          </Text>
        </Td>
      </a>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : ""}>
        <Button
          p="0px"
          bg="transparent"
          variant="no-effects"
          onClick={() => {
            router.push({
              pathname: `event/${eventId}`,
            });
          }}
        >
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            Edit
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
