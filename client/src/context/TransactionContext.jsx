import React, { useCallback, useEffect, useState } from "react";
import { ethers } from 'ethers';
import { contractABI, contractAddress } from "../utils/Constant";

export const TransactionContext = React.createContext();

const getEthereum = () => window.ethereum;

const getErrorMessage = (error) =>
  error?.data?.message ||
  error?.error?.message ||
  error?.reason ||
  error?.message ||
  "Internal Send Transaction Error";

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const createEthereumContract = () => {
    const ethereum = getEthereum();
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return { provider, signer, transactionContract };
  };

  const connectWallet = useCallback(async () => {
    try {
      const ethereum = getEthereum();
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts?.[0] || "";
      setCurrentAccount(account);
      return account;
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  }, []);

  useEffect(() => {
    const ethereum = getEthereum();
    if (!ethereum?.on) return undefined;

    const handleAccountsChanged = (accounts) => {
      setCurrentAccount(accounts?.[0] || "");
    };

    ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const sendTransaction = async (election_id, candidate_id, user_id) => {
    try {
      const ethereum = getEthereum();
      if (ethereum) {
        const account = await connectWallet();
        if (!account) {
          return { valid: false, mess: "Wallet not connected" };
        }
        const { provider, transactionContract } = createEthereumContract();

        const contractCode = await provider.getCode(contractAddress);
        if (contractCode === "0x") {
          return {
            valid: false,
            mess: "Transaction contract is not deployed at the configured address. Run truffle migrate and update REACT_APP_CONTRACT_ADDRESS.",
          };
        }

        const transactionHash = await transactionContract.addToBlockchain(
          account,
          String(user_id),
          String(election_id),
          String(candidate_id)
        );

        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);

        const transactionsCount = await transactionContract.getTransactionCount();
        setTransactionCount(transactionsCount.toNumber());

        return {
          valid: true,
          mess: "Transaction Successful",
          hash: transactionHash.hash,
        };
      } else {
        console.log("No ethereum object");
        return { valid: false, mess: "No ethereum object" };
      }
    } catch (error) {
      console.error("Error sending blockchain transaction:", error);
      if (error.code === "ACTION_REJECTED") {
        return { valid: false, mess: "User Rejected Transaction" };
      } else {
        return { valid: false, mess: getErrorMessage(error) };
      }
    }
  };

  const getAllTransactions = async () => {
    try {
      const ethereum = getEthereum();
      if (ethereum) {
        const { transactionContract: transactionsContract } = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressFrom: transaction.from,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          election_id: transaction.election_id,
          candidate_id: transaction.candidate_id,
          user_id: transaction.user_id,
        }));

        setTransactions(structuredTransactions);
        return structuredTransactions;
      } else {
        console.log("Ethereum is not present");
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        getAllTransactions,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
