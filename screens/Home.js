import React from "react";
import { StyleSheet, Text, View, Pressable, SafeAreaView } from "react-native";

function Home() {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
