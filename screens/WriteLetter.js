import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Input } from "react-native-elements";
import { useAuthentication } from "../utils/hooks/useAuth";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function WriteLetters() {
  const [newPost, setNewPost] = useState("");
  const [newRecipient, setNewRecipient] = useState("");
  const { user } = useAuthentication();
  const collectionRef = collection(db, "posts");

  const createPost = async () => {
    await addDoc(collectionRef, { recipiant: newRecipient, letter: newPost });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.start}>
        <Text style={styles.header}>To: </Text>
        <Input
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          placeholder="enter a name"
          onChangeText={(text) => {
            setNewRecipient(text);
          }}
        ></Input>
      </View>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          placeholder="Type something"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
          onChangeText={(text) => {
            setNewPost(text);
          }}
        />
      </View>
      <Pressable style={styles.startButton} onPress={createPost}>
        <Text style={styles.startText}>send</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  start: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  header: {
    color: "#fff",
    fontSize: 26,
    marginTop: 30,
    marginLeft: 20,
  },
  input: {
    marginTop: 15,
    marginLeft: 10,
    width: 180,
  },
  inputText: {
    color: "#fff",
    fontFamily: "JMHTypewriterBold",
    fontSize: 16,
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
    marginTop: 20,
    width: 100,
  },
  textAreaContainer: {
    borderColor: "#fff",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    width: "80%",
  },
  textArea: {
    color: "#fff",
    height: 150,
    fontFamily: "JMHTypewriterBold",
    fontSize: 16,
  },
});

export default WriteLetters;
