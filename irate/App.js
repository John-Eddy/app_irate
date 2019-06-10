import React, { Component } from "react";

import { createRootNavigator } from "./router";
import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./screens/auth/LoginScreen";
import AuthLoadingScreen from "./screens/auth/AuthLoginScreen";



  const appStack = createRootNavigator();
  
  const authStack = createStackNavigator({ Login: LoginScreen });

  export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: appStack,
      Auth: authStack,
    },
    {
      initialRouteName: 'AuthLoading', 
    }
  ));


