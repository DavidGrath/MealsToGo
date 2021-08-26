import camelize from "camelize";
import { host } from "../../util/env";

export function locationRequest(searchTerm) {
  const url = `${host}/geocode?city=${searchTerm}`;
  return fetch(url);
}

export function locationTransform(result) {
  const { geometry = {} } = camelize(result.results[0]);
  const obj = {};
  obj.lng = geometry.location.lng;
  obj.lat = geometry.location.lat;
  obj.viewport = geometry.viewport;
  return obj;
}
