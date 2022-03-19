import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useAuthentication } from "../utils/hooks/useAuth";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const auth = getAuth();

function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useAuthentication();
  const collectionRef = collection(db, "posts");

  useEffect(() => {
    const getUserPosts = async () => {
      const data = await getDocs(collectionRef);
    };

    getUserPosts();
  }, [userPosts]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.username}>User: {user?.displayName}</Text>

          <Pressable
            style={styles.startButton}
            onPress={() => {
              signOut(auth);
            }}
          >
            <Text style={styles.startText}>sign out</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.scroll}>
          {userPosts.map((post, key) => {
            return (
              <View key={key} style={styles.notepad}>
                <View style={styles.header2}>
                  <Text style={styles.notepadHeader}>Message</Text>
                  <View style={styles.cancel}>
                    <Text style={styles.cancelText}>X</Text>
                  </View>
                </View>
                <View style={styles.center}>
                  <ScrollView style={styles.notepadTextContainer}>
                    <Text style={styles.notepadText}>
                      To: <Text style={styles.name}>{post.recipiant}</Text>
                    </Text>
                    <Text style={styles.notepadTextLetter}>{post.letter}</Text>
                    <Text style={styles.notepadFooter}>
                      From:
                      <Text style={styles.senderName}>{post.displayName}</Text>
                    </Text>
                  </ScrollView>
                </View>
              </View>
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  startText: {
    color: "#fff",
    fontSize: 15,
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
    marginTop: 10,
    width: 100,
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
    height: 300,
    width: 350,
  },
  notepadHeader: {
    color: "#fff",
    fontSize: 27,
    fontFamily: "JMHTypewriterBold",
    marginLeft: 15,
    marginTop: 5,
  },
  notepadTextContainer: {
    backgroundColor: "rgba(255,192,203,255)",
    borderColor: "#000",
    borderWidth: 5,
    height: 220,
    marginTop: 10,
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
    display: "flex",
  },
  name: {
    color: "rgb(189, 19, 55)",
    fontFamily: "JMHTypewriterBold",
    fontSize: 25,
  },
});

export default Profile;
