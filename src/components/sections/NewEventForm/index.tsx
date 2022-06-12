import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { base64 } from "ethers/lib/utils";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { EventFactoryAbi } from "../../../abi/EventFactoryAbi";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import UserContext from "../../../context/User.context";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";

interface IEvent {
  Title: string;
  Description: string;
}

export const NewEventForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const { account } = useContext(UserContext);
  const router = useRouter();
  let ipfs: IPFSHTTPClient | undefined;
  const authorization =
    "Basic " +
    Buffer.from(
      process.env.NEXT_PUBLIC_INFURA_PROJECT_ID +
        ":" +
        process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET
    ).toString("base64");

  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  const formik = useFormik({
    initialValues: {
      Title: "",
      Description: "",
    },
    onSubmit: async (values: IEvent) => {
      onFormSubmit(values);
    },
    validationSchema: yup.object({
      Title: yup.string().trim().required("Title is required"),
    }),
  });

  const onFormSubmit = async (values: IEvent) => {
    setLoading(true);

    if (!image) {
      setLoading(false);
      alert("empty file");
      return;
    } else {
      const imageIpfs = await uploadFile(image);
      await createNewEvent(values.Title, imageIpfs.path, setLoading);
    }
  };

  const uploadFile = async (image: any) => {
    const imagePath = await (ipfs as IPFSHTTPClient).add(image);
    return imagePath;
  };

  async function createNewEvent(
    eventName: string,
    imgUri: string,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    if (addr != null) {
      console.log(addr);
      const contract = new ethers.Contract(
        `${process.env.NEXT_PUBLIC_EVENT_FACTORY_ADDRESS}`,
        EventFactoryAbi,
        signer
      );
      const contractTxn = await contract.createNewEvent(eventName, imgUri);
      await contractTxn.wait();
    } else {
      alert("There is not an account connected");
    }
    setLoading(false);
    router.replace("/event");
  }

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Container
        bg={"#2C2C39"}
        maxW="container.md"
        maxH="container.md"
        padding={"40px"}
        borderRadius={"16px"}
      >
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem
                w="100%"
                h="100%"
                borderRadius={"16px"}
                border={"1px solid #4E4E59"}
                borderStyle={"dashed"}
                _hover={{
                  borderColor: "#5E5E68",
                }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  alignContent={"center"}
                  w="100%"
                  h="100%"
                  p={4}
                  color="white"
                >
                  {image ? (
                    <Image
                      id="previewImage"
                      src={URL.createObjectURL(image)}
                      maxWidth={"100%"}
                    ></Image>
                  ) : (
                    <Input
                      border={"none"}
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={(event: any) => {
                        event.preventDefault();
                        const target = event.target as HTMLInputElement;
                        const file: File = (target.files as FileList)[0];
                        setImage(file);
                      }}
                    />
                  )}
                </Box>
              </GridItem>
              <GridItem w="100%">
                <Box gap={4} display={"flex"} flexDirection={"column"}>
                  <Box>
                    <FormLabel htmlFor="text" color={"white"}>
                      Title *
                    </FormLabel>
                    <Input
                      type="text"
                      name="Title"
                      placeholder="Event name"
                      onChange={formik.handleChange}
                      value={formik.values.Title}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.Title && (
                      <Text fontSize="sm" color={"red.500"}>
                        {formik.errors.Title}
                      </Text>
                    )}
                  </Box>
                  <Box>
                    <Text mb="8px" color={"white"}>
                      Description (optional)
                    </Text>
                    <Textarea
                      placeholder="A description of your event"
                      size="sm"
                      borderRadius={"8px"}
                      name="Description"
                      onChange={formik.handleChange}
                      value={formik.values.Description}
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                  <Button
                    w={"100%"}
                    bgColor={"#5142FC"}
                    _hover={{
                      bgColor: "#5242fcdc",
                    }}
                    color={"white"}
                    disabled={loading || !account}
                    type="submit"
                  >
                    {loading ? <Spinner /> : <>Create Event</>}
                  </Button>
                </Box>
              </GridItem>
            </Grid>
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};
