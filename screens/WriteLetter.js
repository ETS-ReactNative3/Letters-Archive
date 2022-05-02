import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { useAuthentication } from "../utils/hooks/useAuth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const image = {
  uri: "https://indieground.net/wp-content/uploads/2019/05/Indieground_Holographic_Textures_main01.jpg",
};

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
        likeCount: 0,
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
    <ImageBackground source={image} style={styles.image}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Write</Text>
            <Text style={styles.description}>
              Do you have anything weighing on your mind? This is your safe
              space to say whatever you want.
            </Text>
          </View>
          <Card
            containerStyle={{
              alignSelf: "center",
              backgroundColor: "rgba( 255, 255, 255, 0.5 )",
              borderRadius: 50,
              height: 450,
              width: 330,
              marginBottom: 25,
              backdropFilter: "blur( 20px )",
              padding: 20,
            }}
          >
            <View style={styles.header2}>
              <Card.Title style={styles.cardHeader}>Write.</Card.Title>
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
                    setNewRecipient(
                      text.substring(0, 1).toUpperCase() +
                        text.substring(1).toLowerCase()
                    );
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
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cardHeader: {
    fontSize: 22,
    fontFamily: "JMHTypewriterBold",
    letterSpacing: 3,
    marginLeft: 100,
  },
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  notepad: {
    alignSelf: "center",
    marginBottom: 5,
    padding: 10,
    width: 310,
  },
  notepadHeader: {
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
  title: {
    color: "rgb(214, 58, 125)",
    fontFamily: "NeonFuture",
    fontSize: 30,
    textShadowColor: "rgba(214, 58, 125, 1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    paddingBottom: 20,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "rgba(255, 100, 200, 0.9)",
    borderRadius: 20,
    paddingVertical: 8,
    marginBottom: 20,
    width: 100,
  },
  buttonTitle: {
    fontFamily: "JMHTypewriterBold",
    fontSize: 18,
  },
  header2: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "rgb(230, 64, 64)",
    borderColor: "#000",
    padding: 0,
    marginBottom: 10,
    width: 30,
    height: 30,
    marginLeft: 65,
  },
  cancelText: {
    fontFamily: "JMHTypewriterBold",
    fontSize: 20,
    marginBottom: 5,
  },
  description: {
    alignSelf: "flex-start",
    color: "#000",
    fontFamily: "JMHTypewriter",
    fontSize: 15,
    marginBottom: 5,
    paddingHorizontal: 25,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default WriteLetters;
