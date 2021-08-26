const functions = require("firebase-functions");
const Flutterwave = require("flutterwave-node-v3");

const FLUTTERWAVE_PUBLIC_KEY = functions.config().flutterwave.public_key;
const FLUTTERWAVE_PRIVATE_KEY = functions.config().flutterwave.secret_key;
const flutterwave = new Flutterwave(
  FLUTTERWAVE_PUBLIC_KEY,
  FLUTTERWAVE_PRIVATE_KEY,
);

module.exports.tokenize = function (request, response) {
  const body = request.body;
  const payload = {
    token: body.token,
    currency: body.currency,
    country: body.country,
    amount: body.amount,
    email: body.email,
    narration: body.narration,
    tx_ref: body.tx_ref,
  };

  flutterwave.Tokenized.charge(payload)
    .then(function (res) {
      console.log("VER: " + JSON.stringify(res));
      return response.json(res);
    })
    .catch(function (e) {
      console.log(e);
      return response.status(400).send("Bad Request");
    });
};

module.exports.verify = function (request, response) {
  const body = request.body;
  const transactionId = body.transactionId;

  const payload = {
    id: transactionId,
  };
  flutterwave.Transaction.verify(payload)
    .then(function (res) {
      if (res.status === "error") {
        throw new Error();
      }
      const body = {
        data: {
          cardDetails: {
            first6Digits: res.data.card.first_6digits,
            last4Digits: res.data.card.last_4digits,
            cardToken: res.data.card.token,
          },
        },
      };
      console.log("VER: " + JSON.stringify(body));
      return response.json(body);
    })
    .catch(function (e) {
      console.log(e);
      return response.status(400).send("Bad Request");
    });
};
