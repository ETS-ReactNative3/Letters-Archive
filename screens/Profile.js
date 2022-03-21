import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Card, Button } from "react-native-elements";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const auth = getAuth();

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.username}>{auth.currentUser.displayName}</Text>

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
              <Card key={key} containerStyle={styles.notepad}>
                <View style={styles.header2}>
                  <Card.Title style={styles.notepadHeader}>Message</Card.Title>
                  <Card.Title style={styles.notepadHeader2}>♡</Card.Title>
                </View>
                <View style={styles.center}>
                  <ScrollView style={styles.notepadTextContainer}>
                    <Text style={styles.notepadText}>
                      To: <Text style={styles.name}>{post.recipiant}</Text>
                    </Text>
                    <Text style={styles.notepadTextLetter}>{post.letter}</Text>
                    <Text style={styles.notepadFooter}>
                      From:{" "}
                      <Text style={styles.senderName}>{post.displayName}</Text>
                    </Text>
                  </ScrollView>
                </View>
              </Card>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
    width: "100%",
  },
  header2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "rgba(255, 100, 200, 0.8)",
    borderRadius: 20,
    paddingVertical: 8,
    marginTop: 5,
    marginBottom: 10,
    width: 100,
  },
  buttonTitle: {
    fontFamily: "JMHTypewriterBold",
    fontSize: 18,
  },
  username: {
    color: "#fff",
    fontFamily: "NeonFuture",
    fontSize: 26,
    textShadowColor: "rgba(255, 100, 200, 1)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    marginBottom: 10,
  },
  scroll: {
    marginTop: 20,
    marginBottom: 20,
  },
  notepad: {
    backgroundColor: "rgba(255, 100, 200, 0.9)",
    borderColor: "#000",
    borderWidth: 5,
    height: 310,
    marginBottom: 25,
    width: 350,
  },
  notepadHeader: {
    color: "#fff",
    fontSize: 27,
    fontFamily: "JMHTypewriterBold",
    marginTop: 5,
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
    backgroundColor: "rgba(255,192,203,255)",
    borderColor: "#000",
    borderWidth: 4.5,
    height: 207,
    padding: 10,
    width: 310,
  },
  notepadText: {
    fontSize: 20,
    fontFamily: "JMHTypewriter",
  },
  notepadTextLetter: {
    fontSize: 20,
    fontFamily: "JMHTypewriter",
    marginTop: 10,
  },
  notepadFooter: {
    fontSize: 20,
    fontFamily: "JMHTypewriter",
    marginTop: 20,
    marginBottom: 25,
  },
  senderName: {
    color: "rgb(189, 19, 55)",
    fontFamily: "JMHTypewriterBold",
    fontSize: 25,
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
    color: "rgb(189, 19, 55)",
    fontFamily: "JMHTypewriterBold",
    fontSize: 25,
  },
});

export default Profile;
