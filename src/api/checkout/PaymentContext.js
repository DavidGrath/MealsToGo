import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  verifyTransaction,
  createOptions,
  tokenizedPayment,
} from "./PaymentService";
import { AuthenticationContext } from "../authentication/AuthenticationContext";
import { STORAGE_KEYS } from "../../util/constants";

export const PaymentContext = createContext();

export function PaymentContextProvider({ children, ...props }) {
  const authenticationContext = useContext(AuthenticationContext);
  const user = authenticationContext.user;
  const [storedCards, setStoredCards] = useState([]);
  const [paymentState, setPaymentState] = useState({
    type: "none",
    errorMessage: null,
  });

  useEffect(async function () {
    const uid = user.uid;
    const key = `${STORAGE_KEYS.USER_DETAILS}-${uid}`;
    try {
      var userDetails = await AsyncStorage.getItem(key);
      console.log("UDT: " + JSON.stringify(userDetails));
      if (!userDetails) {
        userDetails = JSON.stringify({});
        await AsyncStorage.setItem(key, userDetails);
      }
      const parsedDetails = JSON.parse(userDetails);
      if (!parsedDetails.storedCards) {
        parsedDetails.storedCards = [];
      }
      setStoredCards(parsedDetails.storedCards);
      await AsyncStorage.setItem(key, JSON.stringify(parsedDetails));
    } catch (e) {
      console.log(e.toString());
    }
  }, []);

  useEffect(
    async function () {
      console.log("STC: " + JSON.stringify(storedCards));
      const uid = user.uid;
      const key = `${STORAGE_KEYS.USER_DETAILS}-${uid}`;
      try {
        const userDetails = await AsyncStorage.getItem(key);
        if (!userDetails) {
          await AsyncStorage.setItem(key, JSON.stringify({}));
        }
        const parsedDetails = JSON.parse(userDetails);
        parsedDetails.storedCards = storedCards;
        await AsyncStorage.setItem(key, JSON.stringify(parsedDetails));
      } catch (e) {
        console.log(e.toString());
      }
    },
    [storedCards],
  );

  function sendTransactionForVerification(transactionId) {
    verifyTransaction(transactionId)
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error();
        }
        return response.json();
      })
      .then(function (json) {
        console.log("VFY: " + JSON.stringify(json));
        const { first6Digits, last4Digits, cardToken } = json.data.cardDetails;
        return { first6Digits, last4Digits, cardToken };
      })
      .then(function (cardDetails) {
        persistCard(cardDetails);
      })
      .catch(function (err) {
        console.log(err.toString());
      });
  }

  async function persistCard(cardDetails) {
    const existingCard = storedCards.find(function (card) {
      return card.cardToken === cardDetails.cardToken;
    });
    if (!existingCard) {
      setStoredCards([...storedCards, cardDetails]);
    }
  }

  function createPaymentOptions(sum) {
    return createOptions(sum, user.email);
  }

  function makeTokenizedPayment(amount, creditCard) {
    const email = user.email;
    setPaymentState({ type: "loading", errorMessage: null });
    tokenizedPayment(amount, email, creditCard)
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error();
        }
        return response.json();
      })
      .then(function (json) {
        setPaymentState({ type: "success", errorMessage: null });
      })
      .catch(function (err) {
        console.log(err);
        setPaymentState({
          type: "error",
          errorMessage: err.toString(),
        });
      });
  }

  function setLoading() {
    setPaymentState({ type: "loading", errorMessage: null });
  }
  function handleRedirect(params) {
    console.log("FLU: " + JSON.stringify(params));
    const status = params.status;
    if (status === "successful") {
      setPaymentState({ type: "success", errorMessage: null });
      const id = params.transaction_id;
      sendTransactionForVerification(id);
    } else if (status === "cancelled") {
      setPaymentState({ type: "cancelled", errorMessage: null });
    } else {
      setPaymentState({ type: "error", errorMessage: null });
    }
  }

  function resetPaymentState() {
    setPaymentState({ type: "none", errorMessage: null });
  }
  return (
    <PaymentContext.Provider
      value={{
        sendTransactionForVerification,
        createPaymentOptions,
        makeTokenizedPayment,
        handleRedirect,
        resetPaymentState,
        setLoading,
        paymentState,
        storedCards,
      }}>
      {children}
    </PaymentContext.Provider>
  );
}
