import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { Button, Input } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";

const auth = getAuth();

function Login() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function signInFields() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Invalid email or password",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Login ♡</Text>
      <View style={styles.form}>
        <Input
          placeholder="enter your email"
          containerStyle={styles.control}
          inputStyle={styles.controlText}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          leftIcon={<Icon name="envelope" size={16} color="#fff" />}
        />

        <Input
          placeholder="enter your password"
          containerStyle={styles.control}
          inputStyle={styles.controlText}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon name="key" size={16} color="#fff" />}
        />

        {!!value.error && (
          <View>
            <Text style={styles.error}>{value.error}</Text>
          </View>
        )}

        <Button
          buttonStyle={styles.button}
          title="login"
          titleStyle={styles.buttonTitle}
          onPress={signInFields}
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
  },
  header: {
    color: "#fff",
    fontFamily: "NeonFuture",
    fontSize: 36,
    lineHeight: 80,
    textShadowColor: "rgba(255, 100, 200, 1)",
    textShadowOffset: { width: 3, height: 5 },
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "75%",
  },
  control: {
    width: 250,
  },
  controlText: {
    color: "#fff",
    fontFamily: "JMHTypewriter",
    fontSize: 16,
    marginLeft: 10,
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  error: {
    color: "#dc143c",
    fontFamily: "JMHTypewriterBold",
    fontSize: 15,
  },
});

export default Login;
