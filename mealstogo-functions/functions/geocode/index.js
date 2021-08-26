const functions = require("firebase-functions");
const { locations: locationsMock } = require("./GeocodeMock");

module.exports.geocodeRequest = function (request, response, client) {
  const API_KEY = functions.config().maps_platform.api_key;

  const city = request.query.city;
  //   const mock = request.query.mock;

  // Till I get my billing resolved, mock shall always be "true"
  const mock = "true";

  if (mock === "true") {
    if (!city) {
      response.json({});
      return;
    }
    const location = locationsMock[city.toLowerCase()];
    return response.json(location);
  }
  client
    .geocode({
      params: {
        address: city,
        key: API_KEY,
      },
      timeout: 1000,
    })
    .then(function (res) {
      return response.json(res.data);
    })
    .catch(function (e) {
      response.status(400);
      response.send(e.response.data.error_message);
    });
};
