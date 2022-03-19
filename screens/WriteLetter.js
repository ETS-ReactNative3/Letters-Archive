import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { useAuthentication } from "../utils/hooks/useAuth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function WriteLetters() {
  const [newPost, setNewPost] = useState("");
  const [newRecipient, setNewRecipient] = useState("");
  const collectionRef = collection(db, "posts");
  const { user } = useAuthentication();

  const createPost = async () => {
    if (newRecipient.length > 0 && newPost.length > 14) {
      await addDoc(collectionRef, {
        recipiant: newRecipient,
        letter: newPost,
        displayName: user.displayName,
        userID: user.uid,
      });
    } else {
      alert("Enter a name and type at least 15 characters");
    }
  };

  const clearFields = () => {
    setNewPost("");
    setNewRecipient("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>Write</Text>
        <Text style={styles.description}>
          Do you have anything weighing on your mind? This is your safe space to
          say whatever you want.
        </Text>
      </View>
      <Card containerStyle={styles.card}>
        <View style={styles.header2}>
          <Card.Title style={styles.cardHeader}>Message</Card.Title>
          <Button
            title="x"
            buttonStyle={styles.cancel}
            titleStyle={styles.cancelText}
            onPress={() => {
              clearFields();
            }}
          />
        </View>
        <ScrollView style={styles.notepad}>
          <View style={styles.notepadHeader}>
            <Text style={styles.notepadText}>To:</Text>
            <Input
              placeholder="enter a name"
              containerStyle={styles.input}
              inputStyle={styles.inputRecipient}
              value={newRecipient}
              onChangeText={(text) => {
                setNewRecipient(text);
              }}
            />
          </View>
          <TextInput
            style={styles.textArea}
            placeholder="Type something"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
            value={newPost}
            onChangeText={(text) => {
              setNewPost(text);
            }}
          />
        </ScrollView>
      </Card>
      <Button
        buttonStyle={styles.button}
        title="send"
        titleStyle={styles.buttonTitle}
        onPress={() => {
          createPost();
          clearFields();
        }}
      />
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
  card: {
    height: 450,
    width: 350,
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 100, 200, 1)",
    borderColor: "#000",
    borderWidth: 5,
  },
  cardHeader: {
    color: "#fff",
    fontFamily: "JMHTypewriterBold",
    fontSize: 27,
    alignSelf: "flex-start",
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  notepad: {
    backgroundColor: "rgba(255,192,203,255)",
    borderColor: "#000",
    borderWidth: 4.5,
    marginBottom: 5,
    padding: 10,
    width: 310,
  },
  notepadHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  notepadText: {
    fontSize: 20,
    fontFamily: "JMHTypewriter",
  },
  input: {
    width: 200,
    color: "rgba(255, 100, 200, 0.7)",
  },
  inputRecipient: {
    color: "rgb(189, 19, 55)",
    fontSize: 20,
    fontFamily: "JMHTypewriterBold",
  },
  textArea: {
    color: "#000",
    height: 150,
    fontFamily: "JMHTypewriterBold",
    fontSize: 20,
  },
  username: {
    alignSelf: "center",
    color: "#fff",
    fontFamily: "NeonFuture",
    fontSize: 30,
    textShadowColor: "rgba(255, 100, 200, 1)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    marginBottom: 25,
  },
  button: {
    backgroundColor: "rgba(255, 100, 200, 0.9)",
    borderRadius: 20,
    paddingVertical: 8,
    marginTop: 20,
    width: 90,
  },
  buttonTitle: {
    fontFamily: "JMHTypewriterBold",
    fontSize: 19,
  },
  header2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancel: {
    backgroundColor: "rgb(230, 64, 64)",
    borderColor: "#000",
    borderWidth: 3,
    padding: 0,
    marginBottom: 10,
    width: 35,
  },
  cancelText: {
    fontFamily: "JMHTypewriterBold",
    fontSize: 20,
    marginBottom: 5,
  },
  description: {
    alignSelf: "flex-start",
    color: "#fff",
    fontFamily: "JMHTypewriter",
    fontSize: 15,
    marginBottom: 5,
    width: 330,
  },
});

export default WriteLetters;
