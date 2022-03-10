import Home from "./pages/Home";
import Letters from "./pages/Letters";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Letters" component={Letters} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
