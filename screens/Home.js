import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Card } from "react-native-elements";
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

  const generateColor = () => {
    const R = Math.random() * 255;
    const G = Math.random() * 100;
    const B = Math.random() * 150;
    return `rgb(${R},${G}, ${B} )`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.username}>Home</Text>
        </View>
        {posts.map((post, key) => {
          return (
            <Card
              key={key}
              containerStyle={{
                backgroundColor: generateColor(),
                borderColor: "#000",
                borderWidth: 5,
                height: 310,
                marginBottom: 25,
                width: 350,
              }}
            >
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
                    <Text
                      style={{
                        color: generateColor(),
                        fontFamily: "JMHTypewriterBold",
                        fontSize: 25,
                      }}
                    >
                      {post.displayName}
                    </Text>
                  </Text>
                </ScrollView>
              </View>
            </Card>
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
  name: {
    color: "rgb(189, 19, 55)",
    fontFamily: "JMHTypewriterBold",
    fontSize: 25,
  },
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  header2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notepadHeader: {
    color: "#fff",
    fontSize: 27,
    fontFamily: "JMHTypewriterBold",
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
    marginTop: 25,
    marginBottom: 25,
  },
  username: {
    color: "#fff",
    fontFamily: "NeonFuture",
    fontSize: 30,
    textShadowColor: "rgba(255, 100, 200, 1)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
  },
});

export default Home;
