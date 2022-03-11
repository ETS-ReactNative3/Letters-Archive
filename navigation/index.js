import React from "react";
import { useAuthentication } from "../utils/hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";

function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <UserStack /> : <AuthStack />;
}

export default RootNavigation;
