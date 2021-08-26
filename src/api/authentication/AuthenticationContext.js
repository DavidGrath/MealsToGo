import React, { createContext, useState, useEffect } from "react";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginRequest, registerRequest } from "./AuthenticationService";
import { STORAGE_KEYS } from "../../util/constants";

export const AuthenticationContext = createContext();

export function AuthenticationContextProvider({ children, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      if (!user) {
        return;
      }
      const uid = user.uid;
      const key = `${STORAGE_KEYS.USER_DETAILS}-${uid}`;
      AsyncStorage.getItem(key)
        .then(function (userDetails) {
          if (!userDetails) {
            return AsyncStorage.setItem(key, JSON.stringify({}));
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    [user],
  );

  firebase.auth().onAuthStateChanged(function (u) {
    if (u) {
      setUser(u);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  function onLogin(email, password) {
    setIsLoading(true);
    loginRequest(email, password)
      .then(function (u) {
        setIsLoading(false);
        setUser(u);
        setIsAuthenticated(true);
      })
      .catch(function (e) {
        setIsLoading(false);
        setError(e.toString());
      });
  }

  function onRegister(email, password, repeatedPassword) {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match!");
      return;
    }
    setIsLoading(true);
    registerRequest(email, password, repeatedPassword)
      .then(function (u) {
        setIsLoading(false);
        setUser(u);
        setIsAuthenticated(true);
      })
      .catch(function (e) {
        setIsLoading(false);
        setError(e.toString());
      });
  }

  function onLogout() {
    setUser(null);
    firebase.auth().signOut();
  }
  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated,
        onLogin: onLogin,
        onRegister: onRegister,
        onLogout: onLogout,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
