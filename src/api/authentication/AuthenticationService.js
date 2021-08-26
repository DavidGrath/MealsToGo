import * as firebase from "firebase";

export function loginRequest(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function registerRequest(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}
