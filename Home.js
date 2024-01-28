import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Searchbar } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Camera } from "expo-camera";


const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasPermission, setHasPermission] = useState(null);

  const onChangeSearch = (query) => setSearchQuery(query);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["15%", "90%"], []);

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

  const handleBarcodePress = () => {
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
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BottomSheetScrollView>
              <View style={styles.contentContainer}>
                <Camera style={styles.camera} /> {/* Expo Camera */}
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
});

export default Home;
