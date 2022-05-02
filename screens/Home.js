import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import { Card, Input } from "react-native-elements";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";

const image = {
  uri: "https://indieground.net/wp-content/uploads/2019/05/Indieground_Holographic_Textures_main01.jpg",
};

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [likeState, setLikeState] = useState(false);
  const [dislikeState, setDisikeState] = useState(false);
  const collectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collectionRef);
      const filteredRef = query(
        collectionRef,
        where(`recipiant`, "==", `${searchValue}`)
      );

      const querySnapshot = await getDocs(filteredRef);
      const posts = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setFilteredPosts(posts);

      setPosts(
        searchValue
          ? filteredPosts
          : data.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    };

    getPosts();
  }, [searchValue, filteredPosts]);

  return (
    <ImageBackground source={image} style={styles.image}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Home</Text>
          </View>
          <Pressable>
            <Input
              placeholder="Search for a name"
              inputContainerStyle={styles.searchbar}
              inputStyle={styles.searchInput}
              placeholderTextColor="gray"
              onChangeText={(text) => setSearchValue(text)}
            />
          </Pressable>
          {posts.map((post, key) => {
            return (
              <View style={styles.postWrapper} key={key}>
                <Card
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
                  <Card.Title style={styles.notepadHeader}>Message.</Card.Title>

                  <View style={styles.center}>
                    <ScrollView>
                      <Text style={styles.notepadText}>
                        To: <Text style={styles.name}>{post.recipiant}</Text>
                      </Text>
                      <Text style={styles.notepadTextLetter}>
                        {post.letter}
                      </Text>
                      <Text style={styles.notepadFooter}>
                        From:{" "}
                        <Text
                          style={{
                            color: "#9e4aba",
                            fontSize: 20,
                          }}
                        >
                          {post.displayName}
                        </Text>
                      </Text>
                    </ScrollView>
                  </View>
                </Card>
                <View style={styles.btnWrapper}>
                  <Icon
                    name="thumbs-up"
                    size={25}
                    color="#fff"
                    onPress={() => {
                      const postRef = doc(db, "posts", post.id);
                      !likeState
                        ? updateDoc(postRef, {
                            likeCount: increment(1),
                          })
                        : null;
                      setLikeState(!likeState);
                    }}
                  />
                  <Text style={styles.likeCount}>{post.likeCount}</Text>
                  <Icon
                    name="thumbs-down"
                    size={25}
                    color="#fff"
                    onPress={() => {
                      const postRef = doc(db, "posts", post.id);
                      !dislikeState
                        ? updateDoc(postRef, {
                            likeCount: increment(-1),
                          })
                        : null;
                      setDisikeState(!dislikeState);
                    }}
                  />
                </View>
              </View>
            );
          })}
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
  center: {
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  title: {
    color: "rgb(214, 58, 125)",
    fontFamily: "NeonFuture",
    fontSize: 30,
    textShadowColor: "rgba(214, 58, 125, 1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  notepadHeader: {
    fontSize: 22,
    fontFamily: "JMHTypewriterBold",
    paddingBottom: 15,
    letterSpacing: 3,
  },
  notepadText: {
    fontSize: 18,
    fontFamily: "JMHTypewriterBold",
    paddingBottom: 20,
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
  name: {
    color: "#ff368c",
    fontSize: 20,
  },
  searchbar: {
    alignSelf: "center",
    width: 280,
  },
  searchInput: {
    fontSize: 18,
    fontFamily: "JMHTypewriterBold",
    color: "#000",
  },
  postWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  btnWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "40%",
    marginBottom: 40,
  },
  likeCount: {
    fontFamily: "JMHTypewriterBold",
    color: "#ffffff",
    fontSize: 16,
    marginRight: 5,
  },
});

export default Home;
