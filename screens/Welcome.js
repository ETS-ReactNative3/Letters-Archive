import { StyleSheet, Text, View, Pressable } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

function Welcome({ navigation }) {
  const [loaded] = useFonts({
    JMHTypewriter: require("../assets/fonts/JMHTypewriter.ttf"),
    JMHTypewriterBold: require("../assets/fonts/JMHTypewriterBold.ttf"),
    NeonFuture: require("../assets/fonts/NeonFuture.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>unsaid feelings</Text>
      <View style={styles.buttonsWrapper}>
        <Pressable
          style={styles.startButton}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.startText}>login</Text>
        </Pressable>
        <Pressable
          style={styles.startButton}
          onPress={() => {
            navigation.navigate("Sign Up");
          }}
        >
          <Text style={styles.startText}>sign up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 150,
  },
  header: {
    color: "#fff",
    fontFamily: "NeonFuture",
    fontSize: 60,
    lineHeight: 90,
    textShadowColor: "rgba(255, 100, 200, 1)",
    textShadowOffset: { width: 3, height: 5 },
    textShadowRadius: 1,
    marginBottom: 30,
  },
  startText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "JMHTypewriter",
  },
  startButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 100, 200, 0.7)",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 25,
    width: 105,
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "75%",
  },
});

export default Welcome;
