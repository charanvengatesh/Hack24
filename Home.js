import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Alert
} from "react-native";
import { Card } from "react-native-paper";
import ProductCard from "./components/ItemCard";
import axios from "axios";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Searchbar } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Camera } from "expo-camera";
import Scanner from "./components/BarcodeScanner";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [productData, setProductData] = useState(null);

  const onChangeSearch = (query) => setSearchQuery(query);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["13%", "90%"], []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleFocus = () => {
    bottomSheetRef.current?.expand();
  };

  const handleSheetChanges = (index) => {
    if (index == 0) {
      Keyboard.dismiss();
    }
  };

  const handleBarCodeScanned = async (type, data) => {
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.net/api/v2/product/${data}`
      );
      console.log(response.data); // Log the API response

      if (
        response.data &&
        response.data.status === 1 &&
        response.data.product
      ) {
        setProductData(response.data);
      } else {
        Alert.alert("Product not found");
        setProductData(null);
      }
    } catch (error) {
      console.error("Error details:", error); // Log detailed error
      Alert.alert("Error fetching product data", `Details: ${error.message}`);
      setProductData(null);
    }
    setIsScannerVisible(false);
  };




  const handleBarcodePress = () => {
    setIsScannerVisible(!isScannerVisible);
    console.log("Barcode Icon Pressed");
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {isScannerVisible && (
            <Scanner
              style={styles.scannerStyle}
              onBarCodeScanned={handleBarCodeScanned}
            />
          )}
          {productData && <ProductCard data={productData} />}
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BottomSheetScrollView>
              <View style={styles.contentContainer}>
                <Searchbar
                  theme={{ colors: { primary: "green", accent: "lightgreen" } }}
                  placeholder="Search"
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                  onFocus={handleFocus}
                  traileringIcon={() => (
                    <MaterialCommunityIcons
                      name="line-scan"
                      size={24}
                      onPress={handleBarcodePress}
                    />
                  )}
                  style={{
                    backgroundColor: "#CAD593", // Background color of the Searchbar
                    // borderRadius: 1, // Optional: Adjust the border radius as needed
                  }}
                  // inputStyle={{ color: 'yourTextColor' }} // Text color of the Searchbar
                  // placeholderTextColor="yourPlaceholderColor" // Placeholder text color
                />
              </View>
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "lightgray",
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  scannerStyle: {
    overflow: "hidden",
    borderRadius: 20, // Adjust as needed
    marginTop: 20, // Adjust as needed
    height: 300,
    // Add any other desired styling
  },
});

export default Home;
