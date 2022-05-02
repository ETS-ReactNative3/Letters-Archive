import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";

const image = {
  uri: "https://indieground.net/wp-content/uploads/2019/05/Indieground_Holographic_Textures_main01.jpg",
};

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
    <ImageBackground source={image} style={styles.image}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 150,
  },
  header: {
    color: "rgb(214, 58, 125)",
    fontFamily: "NeonFuture",
    fontSize: 60,
    lineHeight: 90,
    textShadowColor: "rgba(214, 58, 125, 1)",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 1,
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "75%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Welcome;
