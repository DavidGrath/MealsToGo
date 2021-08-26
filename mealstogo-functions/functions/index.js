const functions = require("firebase-functions");
const places = require("./places");
const geocode = require("./geocode");
const payments = require("./payments");

const { Client } = require("@googlemaps/google-maps-services-js");
// !!! CAUTION !!! - DO NOT DEPLOY
// I created these functions to run in another project. I cannot yet them
// in that project till I have resolved billing issue
// It will override the function I wrote on my other system

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const client = new Client({});

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  const user = request.query.user;
  var username = user ? user : "none";
  response.send(`Hello ${username}, from Firebase!`);
});

exports.placesNearby = functions.https.onRequest(function (request, response) {
  places.placesRequest(request, response, client);
});

exports.geocode = functions.https.onRequest(function (request, response) {
  geocode.geocodeRequest(request, response, client);
});

exports.verify = functions.https.onRequest(function (request, response) {
  payments.verify(request, response);
});

exports.tokenize = functions.https.onRequest(function (request, response) {
  payments.tokenize(request, response);
});
