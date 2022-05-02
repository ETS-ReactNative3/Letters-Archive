import React from "react";
import "./config/firebase";
import RootNavigation from "./navigation";
import { ThemeProvider } from "react-native-elements";

function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}

export default App;
