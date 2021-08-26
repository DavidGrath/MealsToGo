import uuid from "react-native-uuid";
import { API_CONFIGS } from "../../util/constants";
import { host } from "../../util/env";

function generateTxRef() {
  return uuid.v4();
}

export function createOptions(amount, email) {
  const options = {
    authorization: API_CONFIGS.FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: generateTxRef(),
    amount: 2000,
    currency: "NGN",
    customer: {
      email: email,
    },
    payment_options: "card",
  };
  return options;
}

export function tokenizedPayment(amount, email, creditCard) {
  const payload = {
    token: creditCard.cardToken,
    currency: "NGN",
    country: "NG",
    amount: 2500,
    email: email,
    narration: "Sample tokenized charge",
    tx_ref: generateTxRef(),
  };
  const url = `${host}/tokenize`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export function verifyTransaction(transactionId) {
  const url = `${host}/verify`;
  const body = {
    transactionId: transactionId,
  };
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
