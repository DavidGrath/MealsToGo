const functions = require("firebase-functions");
const { mocks, addMockImage } = require("./mock");

const API_KEY = functions.config().maps_platform.api_key;

function addGoogleImage(restaurant) {
  const ref = restaurant.photos[0].photo_reference;
  if (!ref) {
    restaurant.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg",
    ];
    restaurant.photos = [
      `https://maps.googleapis.com/maps/api/place/photo?maxWidth=400&photo_reference=${ref}&key=${API_KEY}`,
    ];
    return restaurant;
  }
}

module.exports.placesRequest = function (request, response, client) {
  const location = request.query.location;
  // const mock = request.query.mock
  //Till I get my billing resolved, mock shall always be "true"
  const mock = "true";

  if (mock === "true") {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImage);
    }
    return response.json(data);
  }
  client
    .placesNearby({
      params: {
        location: location,
        radius: 1500,
        type: "restaurant",
        key: API_KEY,
      },
      timeout: 1000,
    })
    .then(function (res) {
      res.data.results = res.data.results.map(addGoogleImage);
      return response.json(res.data);
    })
    .catch(function (e) {
      response.status(400);
      response.send(e.response.data.error_message);
    });
};
