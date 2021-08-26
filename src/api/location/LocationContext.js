import React, { useState, createContext, useEffect } from "react";

import { locationRequest, locationTransform } from "./LocationService";

export const LocationContext = createContext();

export function LocationContextProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [keyword, setKeyword] = useState("antwerp");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  function onSearch(searchKeyword) {
    setIsLoading(true);
    setKeyword(searchKeyword);
  }

  useEffect(
    function () {
      if (!keyword.length) {
        return;
      }
      //TODO Bug: Searching for a bad string will not empty the list immediately
      // Value will be read by context consumer before setLocation(null) takes
      // effect
      locationRequest(keyword.toLowerCase())
        .then(res => {
          return res.json();
        })
        .then(function (json) {
          return locationTransform(json);
        })
        .then(function (result) {
          setError(null);
          setIsLoading(false);
          setLocation(result);
        })
        .catch(function (err) {
          setIsLoading(false);
          setLocation(null);
          console.log("FIL: " + err);
          setError(err);
        });
    },
    [keyword],
  );

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}>
      {children}
    </LocationContext.Provider>
  );
}
