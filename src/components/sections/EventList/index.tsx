import {
  Box,
  Button,
  Icon,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import TablesTableRow from "./TablesTableRow";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/User.context";
import { useMoralis } from "react-moralis";
import { Event, parseToEvents } from "../../../models/Event";
import { BsEmojiFrown } from "react-icons/bs";
import { useRouter } from "next/router";

export const EventList = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const { Moralis } = useMoralis();
  const { account } = useContext(UserContext);
  const [events, setEvents] = useState<Array<Event>>([]);
  const route = useRouter();

  useEffect(() => {
    async function fetchEventsCreatedByUser() {
      const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
      const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
      Moralis.start({
        serverUrl,
        appId,
      });
      const Events = Moralis.Object.extend("Events");
      const query = new Moralis.Query(Events);
      query.equalTo("owner", account);
      const result = await query.find();
      setEvents(parseToEvents(result));
    }

    fetchEventsCreatedByUser();
  }, [account]);

  return (
    <>
      <Box
        width={"100vw"}
        height={"100vh"}
        display={"flex"}
        alignItems={"center"}
        paddingTop={"150px"}
        overflowX={"hidden"}
        flexDir={"column"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width="60%"
          maxW={"7xl"}
        >
          <Text fontSize={"2xl"} paddingBottom={"40px"} color={"white"}>
            My Events
          </Text>

          <Button
            colorScheme={"whiteAlpha"}
            onClick={() => {
              route.replace("/event/create-event");
            }}
          >
            Create Event
          </Button>
        </Box>
        {events.length > 0 ? (
          <Table variant="simple" color={textColor} maxW={"7xl"} width="60%">
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" borderColor={borderColor} color="gray.400">
                  Event Name
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Network
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Status
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Address
                </Th>
                <Th borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.map((row, index, arr) => {
                return (
                  <TablesTableRow
                    eventId={row.eventId}
                    eventAddress={row.eventAddress}
                    key={index}
                    eventName={row.eventName}
                    isLast={index === arr.length - 1 ? true : false}
                  />
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <Stack direction={"column"} paddingTop={"150px"} gap={4}>
            <Box w={"100%"} textAlign={"center"}>
              <Icon as={BsEmojiFrown} w={12} h={12} color={"white"} />
            </Box>
            {account ? (
              <Text color={"white"}>
                We couldn't find any event created by you
              </Text>
            ) : (
              <Text color={"white"}>Connect a wallet to see your events</Text>
            )}
          </Stack>
        )}
      </Box>
    </>
  );
};
