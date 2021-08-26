import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, Button } from "react-native";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../api/authentication/AuthenticationContext";
import { STORAGE_KEYS } from "../util/constants";

function CameraScreen({ navigation, ...props }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef();

  const authenticationContext = useContext(AuthenticationContext);
  const user = authenticationContext.user;

  useEffect(() => {
    (async () => {
      const response = await Camera.requestPermissionsAsync();
      setHasPermission(response.status === "granted");
    })();
  }, []);

  async function takePhoto() {
    const photo = await cameraRef.current.takePictureAsync();
    const key = `${STORAGE_KEYS.USER_PROFILE}-${user.uid}`;
    AsyncStorage.setItem(key, photo.uri);
    navigation.goBack();
  }
  function nullPermissionComponent() {
    return <View style={{ backgroundColor: "yellow", flex: 1 }}></View>;
  }
  function noPermissionComponent() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Permission is needed for camera to run!</Text>
      </View>
    );
  }

  function cameraComponent() {
    return (
      <Camera
        type={type}
        style={{ width: "100%", height: "100%" }}
        ref={camera => (cameraRef.current = camera)}>
        <View style={{ position: "absolute", left: "50%", bottom: "10%" }}>
          <Button
            title="CAPTURE"
            onPress={function () {
              takePhoto();
            }}
          />
        </View>
      </Camera>
    );
  }

  const body =
    hasPermission !== null
      ? hasPermission === false
        ? noPermissionComponent()
        : cameraComponent()
      : nullPermissionComponent();

  return body;
}

export default CameraScreen;
