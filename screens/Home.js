import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [posts, setPosts] = useState([]);
  const collectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {posts.map((post) => {
          return (
            <View style={styles.notepad}>
              <View style={styles.header}>
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
                </ScrollView>
              </View>
            </View>
          );
        })}
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
  scroll: {
    marginTop: 10,
    marginBottom: 20,
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
    color: "rgb(230, 64, 64)",
    fontFamily: "JMHTypewriterBold",
    fontSize: 25,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notepad: {
    backgroundColor: "rgb(197, 144, 222)",
    borderColor: "#000",
    borderWidth: 5,
    height: 300,
    marginTop: 20,
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
});

export default Home;
