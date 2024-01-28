import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import axios from "axios";

export default function Scanner({ style }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleFocus = async (e) => {
    if (cameraRef.current) {
      const { x, y } = e.nativeEvent;
      await cameraRef.current.focusAsync({ x, y });
    }
  };


  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    Alert.alert("Barcode Scanned", `Type: ${type}\nData: ${data}`, [
      { text: "OK", onPress: () => setScanned(false) },
    ]);

    const response = await axios.post('https://world.openfoodfacts.net/api/v2/product/' + data)
    console.log(response.data);
    console.log("here");
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={[styles.container, style]} >
      <Camera
        style={[StyleSheet.absoluteFillObject, style]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ref={cameraRef}
        autoFocus={Camera.Constants.AutoFocus.on}
      >
        <TouchableOpacity style={{ flex: 1 }} onPress={handleFocus} />
        <View style={styles.alignmentBar} />
        {scanned}
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  camera: {
    flex: 1,
  },
  alignmentBar: {
    position: "absolute",
    left: "20%", // Adjust as needed
    right: "20%", // Adjust as needed
    height: 4, // Adjust the thickness of the bar
    backgroundColor: "yellow",
    top: "50%", // Position it in the middle of the screen
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontSize: 16,
    color: "white",
  },
});