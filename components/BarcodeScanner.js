import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { Camera } from "expo-camera";

export default function Scanner({ style }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("Barcode Scanned", `Type: ${type}\nData: ${data}`, [
      { text: "OK", onPress: () => setScanned(false) },
    ]);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={[styles.container, style]}>
      <Camera
        style={[StyleSheet.absoluteFillObject, style]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        autoFocus="on"
      >
        {scanned}
      </Camera>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 16,
    color: 'white',
  },
});
