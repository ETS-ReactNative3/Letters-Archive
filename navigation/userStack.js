import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import WriteLetters from "../screens/WriteLetter";
import Profile from "../screens/Profile";
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function UserStack() {
  const BottomNav = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => (
              <Icon name="home" size={32} color="rgba(215, 110, 210, 0.9)" />
            ),
          }}
        />
        <Tab.Screen
          name="Send"
          component={WriteLetters}
          options={{
            tabBarIcon: () => (
              <Icon
                name="envelope"
                size={27}
                color="rgba(215, 110, 210, 0.9)"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => (
              <Icon name="user" size={27} color="rgba(215, 110, 210, 0.9)" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomNav"
          component={BottomNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserStack;
