import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { Camera } from "expo-camera";
import axios from "axios";

const Scanner = ({ style, onBarCodeScanned }) => {
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
    try {
      const response = await axios.post('https://world.openfoodfacts.net/api/v2/product/' + data)
      onBarCodeScanned(response.data);

      Alert.alert(
        'Barcode Scanned',
        `Scanned successfully`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      // console.log(response.data);
    } catch (error) {
      console.log("there was an error in receiving the data");
    }
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
  alignmentBar: {
    position: "absolute",
    left: "20%", // Adjust as needed
    right: "20%", // Adjust as needed
    height: 4, // Adjust the thickness of the bar
    backgroundColor: "yellow",
    top: "50%", // Position it in the middle of the screen
  },
});

export default Scanner;
