import {
  Box,
  Button,
  Icon,
  Img,
  Spinner,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useRouter } from "next/router";
import { TokenForm } from "../TokenForm";
import { useMoralis } from "react-moralis";
import { Event, parseToEvent } from "../../../models/Event";
import UserContext from "../../../context/User.context";

interface IEvenDetail {
  eventId: string;
}

export const EventDetail = (props: IEvenDetail) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [loading, setLoading] = useState<boolean>(false);
  const [eventDetail, setEventDetail] = useState<Event>();
  const { account } = useContext(UserContext);
  const { Moralis } = useMoralis();
  const router = useRouter();

  useEffect(() => {
    async function fetchEventById(eventId: string) {
      const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
      const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
      Moralis.start({
        serverUrl,
        appId,
      });
      const Events = Moralis.Object.extend("Events");
      const query = new Moralis.Query(Events);
      query.equalTo("owner", account);
      query.equalTo("eventId", eventId);
      const result = await query.find();
      console.log(result);
      setEventDetail(parseToEvent(result));
    }

    if (account) fetchEventById(props.eventId);
  }, [account]);

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      paddingTop={"150px"}
      overflowX={"hidden"}
      flexDir={"column"}
      gap={8}
    >
      {eventDetail == undefined ? (
        <Text color={"whiteAlpha.800"}>Please connect an account (:</Text>
      ) : (
        <Stack
          direction={"column"}
          maxW={"7xl"}
          width="60%"
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Img
              width={100}
              height={100}
              src={`https://ipfs.io/ipfs/${eventDetail.imgUri}`}
              alt={"Image from the Event"}
            ></Img>

            <Text color={"whiteAlpha.800"} fontSize={"xl"}>
              {`https://ipfs.io/ipfs/${eventDetail.imgUri}`}
            </Text>

            <Text color={"whiteAlpha.800"} fontSize={"xl"}>
              {eventDetail.eventName}
            </Text>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Icon
              as={BsArrowLeftShort}
              w={8}
              h={8}
              color={"white"}
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => router.push("/event")}
            />
            <Button onClick={onOpen}>Create new Token</Button>
            <TokenForm
              isOpen={isOpen}
              onClose={onClose}
              eventId={props.eventId}
            />
          </Stack>
        </Stack>
      )}
      <Table variant="simple" color={textColor} maxW={"7xl"} width="60%">
        <Thead>
          <Tr my=".8rem" pl="0px" color="gray.400">
            <Th pl="0px" borderColor={borderColor} color="gray.400">
              ID
            </Th>
            <Th pl="0px" borderColor={borderColor} color="gray.400">
              Media
            </Th>
            <Th pl="0px" borderColor={borderColor} color="gray.400">
              Name
            </Th>
            <Th borderColor={borderColor} color="gray.400">
              Description
            </Th>
            <Th borderColor={borderColor} color="gray.400">
              Supply
            </Th>
            <Th borderColor={borderColor}></Th>
          </Tr>
        </Thead>
        <Tbody>{loading ? <></> : <Tr></Tr>}</Tbody>
      </Table>
      {loading ? (
        <Spinner
          marginTop={"80px"}
          color="white.500"
          emptyColor="gray.200"
          size="xl"
        />
      ) : (
        <></>
      )}
    </Box>
  );
};
