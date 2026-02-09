import abi from "./Transaction.json";

export const contractABI = abi.abi;

export const contractAddress =
  process.env.REACT_APP_CONTRACT_ADDRESS ||
  "0xc4D5f3d56A417e76AF43325FE057b1850Ec96367";
//Change the contractAddress after executing the command: truffle migrate
