import React, { useState, useRef, useMemo } from "react";
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

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["15%", "90%"], []);

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
    // You can add your logic here for what should happen when the barcode icon is pressed
  };

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
                <Searchbar
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
