import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Card, Button } from "react-native-elements";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const auth = getAuth();

const image = {
  uri: "https://indieground.net/wp-content/uploads/2019/05/Indieground_Holographic_Textures_main01.jpg",
};

function Profile() {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      // find docs that have same user id
      const q = query(
        collection(db, "posts"),
        where("userID", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      setUserPosts(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    };

    getUserPosts();
  }, [userPosts]);

  return (
    <ImageBackground source={image} style={styles.image}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.username}>
              User: {auth.currentUser.displayName}
            </Text>

            <Button
              buttonStyle={styles.button}
              title="sign out"
              titleStyle={styles.buttonTitle}
              onPress={() => {
                signOut(auth);
              }}
            />
          </View>

          <ScrollView style={styles.scroll}>
            {userPosts.map((post, key) => {
              return (
                <Card
                  key={key}
                  containerStyle={{
                    backgroundColor: "rgba( 255, 255, 255, 0.5 )",
                    borderRadius: 50,
                    height: 300,
                    marginBottom: 25,
                    width: 330,
                    backdropFilter: "blur( 20px )",
                    padding: 20,
                  }}
                >
                  <View style={styles.header2}>
                    <Card.Title style={styles.notepadHeader}>
                      Message
                    </Card.Title>
                  </View>
                  <View style={styles.center}>
                    <ScrollView style={styles.notepadTextContainer}>
                      <Text style={styles.notepadText}>
                        To: <Text style={styles.name}>{post.recipiant}</Text>
                      </Text>
                      <Text style={styles.notepadTextLetter}>
                        {post.letter}
                      </Text>
                      <Text style={styles.notepadFooter}>
                        From:{" "}
                        <Text style={styles.senderName}>
                          {post.displayName}
                        </Text>
                      </Text>
                    </ScrollView>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
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
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
    width: "100%",
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
  username: {
    color: "rgb(214, 58, 125)",
    fontFamily: "NeonFuture",
    fontSize: 30,
    textShadowColor: "rgba(214, 58, 125, 1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  scroll: {
    marginTop: 20,
    marginBottom: 20,
  },
  notepadHeader: {
    fontSize: 22,
    fontFamily: "JMHTypewriterBold",
    paddingBottom: 15,
    letterSpacing: 3,
  },
  notepadHeader2: {
    color: "#fff",
    fontFamily: "NeonFuture",
    fontSize: 32,
    textShadowColor: "rgba(20, 10, 20, 1)",
    textShadowOffset: { width: 3, height: 4 },
    textShadowRadius: 1,
  },
  notepadTextContainer: {
    height: 207,
    padding: 10,
    width: 310,
  },
  notepadText: {
    fontSize: 20,
    fontFamily: "JMHTypewriter",
  },
  notepadTextLetter: {
    fontSize: 18,
    fontFamily: "JMHTypewriterBold",
    paddingBottom: 20,
  },
  notepadFooter: {
    fontSize: 18,
    fontFamily: "JMHTypewriterBold",
  },
  senderName: {
    color: "#9e4aba",
    fontSize: 20,
  },
  cancel: {
    backgroundColor: "rgb(230, 64, 64)",
    marginRight: 15,
    marginTop: 5,
    paddingHorizontal: 5,
    borderColor: "#000",
    borderWidth: 3,
  },
  cancelText: {
    fontFamily: "JMHTypewriterBold",
    fontSize: 20,
  },
  center: {
    alignItems: "center",
  },
  name: {
    color: "#ff368c",
    fontSize: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Profile;
