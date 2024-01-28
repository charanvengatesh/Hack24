import { StyleSheet, Text, View } from 'react-native';
import Home from './Home';
import BarcodeScanner from './components/BarcodeScanner'
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Scanner from './components/BarcodeScanner';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#9CAFB7", // Sage green color
    accent: "#90EE90", // Light green color, using hexadecimal code
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Home />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
