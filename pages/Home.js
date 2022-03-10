import { StyleSheet, Text, View, Pressable } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

function Home({ navigation }) {
  const [loaded] = useFonts({
    CutiveMonoRegular: require("../assets/fonts/CutiveMonoRegular.ttf"),
    NeonFuture: require("../assets/fonts/NeonFuture.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>the weight of an unsent love letter...</Text>
      <Pressable
        style={styles.startButton}
        onPress={() => {
          navigation.navigate("Letters");
        }}
      >
        <Text style={styles.startText}>open letters</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
  },
  header: {
    color: "#fff",
    fontFamily: "NeonFuture",
    fontSize: 36,
    lineHeight: 80,
    textShadowColor: "rgba(255, 100, 200, 1)",
    textShadowOffset: { width: 3, height: 5 },
    textShadowRadius: 1,
  },
  startText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "CutiveMonoRegular",
  },
  startButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 100, 200, 0.7)",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 50,
  },
});

export default Home;
