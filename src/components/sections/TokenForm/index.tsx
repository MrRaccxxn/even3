import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { create, IPFSHTTPClient } from "ipfs-http-client";
import { useFormik } from "formik";
import React, { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import { ethers } from "ethers";
import { EventAbi } from "../../../abi/EventAbi";

interface IToken {
  File: any;
  Name: string;
  Description: string;
  Supply: number;
  Price: number;
}

export const TokenForm = (props: any) => {
  const { isOpen, onClose, eventId, eventContractAddress } = props;
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

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
      File: "",
      Name: "",
      Description: "",
      Supply: 1,
      Price: 0,
    },
    onSubmit: async (values: IToken) => {
      onFormSubmit(values);
    },
    validationSchema: yup.object({
      Name: yup.string().trim().required("Name is required"),
      Supply: yup.number().positive().required("Supply is required"),
      Price: yup.number().positive().required("Price is required"),
    }),
  });

  const onFormSubmit = async (values: IToken) => {
    setLoading(true);

    if (!file || file.length === 0) {
      setLoading(false);
      alert("empty file");
      return;
    } else {
      const image = await uploadFile(file);

      const metadata = {
        name: values.Name,
        description: values.Description,
        price: values.Price,
        supply: values.Supply,
        image: `ipfs://` + image.path,
      };

      const tokenUri = await (ipfs as IPFSHTTPClient).add(
        JSON.stringify(metadata)
      );

      await addNewToken(values, `ipfs://` + tokenUri, setLoading);
    }

    onClose();
  };

  const uploadFile = async (image: string) => {
    const imagePath = await (ipfs as IPFSHTTPClient).add(image);
    return imagePath;
  };

  async function addNewToken(
    values: IToken,
    tokenUri: string,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    if (addr != null) {
      console.log(addr);
      const contract = new ethers.Contract(
        eventContractAddress,
        EventAbi,
        signer
      );
      const contractTxn = await contract.addNewToken(
        tokenUri,
        values.Price,
        values.Supply
      );
      await contractTxn.wait();
      setLoading(false);
    } else {
      alert("There is not an account connected");
    }
    setLoading(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>Create new Token</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Media</FormLabel>
              <input
                name="File"
                type="file"
                accept="image/*"
                onChange={(event: any) => {
                  const fileInput = event.currentTarget.files[0];
                  setFile(fileInput);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Name *</FormLabel>
              <Input
                type="text"
                name="Name"
                placeholder="Token name"
                value={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.Name && (
                <Text fontSize="sm" color={"red.500"}>
                  {formik.errors.Name}
                </Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type={"text"}
                name={"Description"}
                placeholder="Token description"
                value={formik.values.Description}
                onChange={formik.handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Supply *</FormLabel>
              <Input
                type={"number"}
                name={"Supply"}
                onChange={formik.handleChange}
              />
              {formik.errors.Supply && (
                <Text fontSize="sm" color={"red.500"}>
                  {formik.errors.Supply}
                </Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price *</FormLabel>
              <Input
                type={"number"}
                name={"Price"}
                onChange={formik.handleChange}
              />
              {formik.errors.Price && (
                <Text fontSize="sm" color={"red.500"}>
                  {formik.errors.Price}
                </Text>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              {loading ? <Spinner /> : <>Save</>}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
