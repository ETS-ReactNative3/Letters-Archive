import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";

function Welcome({ navigation }) {
  // import fonts
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
      <Text style={styles.header}>letters archive</Text>
      <View style={styles.buttonsWrapper}>
        <Button
          buttonStyle={styles.button}
          title="login"
          titleStyle={styles.buttonTitle}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
        <Button
          buttonStyle={styles.button}
          title="sign up"
          titleStyle={styles.buttonTitle}
          onPress={() => {
            navigation.navigate("Sign Up");
          }}
        />
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
    textShadowOffset: { width: 5, height: 7 },
    textShadowRadius: 1,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "rgba(255, 100, 200, 0.8)",
    borderRadius: 20,
    paddingVertical: 8,
    marginTop: 20,
    width: 100,
  },
  buttonTitle: {
    fontFamily: "JMHTypewriterBold",
    fontSize: 18,
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "75%",
  },
});

export default Welcome;
