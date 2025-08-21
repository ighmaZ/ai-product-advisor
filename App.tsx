import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryProvider } from "./src/providers/QueryProvider";
import AdvisorScreen from "./src/components/AdvisorScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <View style={styles.container}>
          <AdvisorScreen />
          <StatusBar style="auto" />
        </View>
      </QueryProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
