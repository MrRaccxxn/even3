export const EventFactoryAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "eventName",
        type: "string",
      },
      {
        internalType: "string",
        name: "imgUri",
        type: "string",
      },
    ],
    name: "createNewEvent",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "eventName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "eventAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "imgUri",
        type: "string",
      },
    ],
    name: "newEventCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "eventContract",
    outputs: [
      {
        internalType: "contract Event",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
    ],
    name: "getEventById",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
