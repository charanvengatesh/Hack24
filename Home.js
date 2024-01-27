import React, { useState, useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Button, Card, Searchbar } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["15%", "90%"], []);

  const expandBottomSheet = () => {
    bottomSheetRef.current?.snapTo(1); // Assuming 1 is the index for 90% height
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
          <View style={styles.contentContainer}>
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              onFocus={expandBottomSheet}
            />
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
});

export default Home;
