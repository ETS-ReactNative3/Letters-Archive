import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const Stack = createStackNavigator();

function AuthStack() {
  const screenOptions = {
    headerTransparent: true,
    headerBackImage: () => (
      <Icon
        name="hand-o-left"
        color="#fff"
        size={27}
        style={{
          color: "rgba(214, 58, 125, 0.5)",
          marginHorizontal: 20,
          textShadowColor: "rgba(214, 58, 125, 1)",
          textShadowOffset: { width: 3, height: 3 },
          textShadowRadius: 1,
        }}
      />
    ),
    headerStyle: {
      backgroundColor: "#000",
    },
    headerBackTitleStyle: {
      display: "none",
    },
    headerTitleStyle: {
      display: "none",
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign Up" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStack;
