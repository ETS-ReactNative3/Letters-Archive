import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, View, Pressable, SafeAreaView } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuth";
import { getAuth } from "firebase/auth";

const auth = getAuth();

function Profile() {
  const { user } = useAuthentication();

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
    width: "100%",
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
});

export default Profile;
