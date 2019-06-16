import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Icon } from "react-native-elements";

import FavoriteScreen from "./screens/FavoriteScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ScanScreen from "./screens/ScanScreen";
import HistoryScreen from "./screens/HistoryScreen";
import Profile from "./screens/Profile";
import ArticleScreen from "./screens/ArticleScreen";


let screen = Dimensions.get("window");

const Tabs = createMaterialBottomTabNavigator(
  {
    Favorite: {
      screen: FavoriteScreen,
      navigationOptions: {
        tabBarLabel: "Favoris",
        tabBarColor: "#182cc9",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="star-o" type="font-awesome" size={24} color={tintColor} />
        )
      }
    },
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarLabel: "Dashboard",
        tabBarColor: "#157f17",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-pie" type="ionicon" size={24} color={tintColor} />
        )
      }
    },
    Scan: {
      screen: ScanScreen,
      navigationOptions: {
        tabBarLabel: "Scanner",
        tabBarColor: "#dbe220",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="barcode-scan"
            type="material-community"
            size={24}
            color={tintColor}
          />
        )
      }
    },
    History: {
      screen: HistoryScreen,
      navigationOptions: {
        tabBarLabel: "Historique",
        tabBarColor: "#c9182c",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="history"
            type="fontawesome5"
            size={25}
            color={tintColor}
          />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profil",
        tabBarColor: "#8b18c9",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" type="feather" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Scan",
    activeColor: "#ffffff",
    inactiveColor: "#ffffff",
    barStyle: { backgroundColor: "#696969" }
  }
);

export const FavoriteStack = createStackNavigator({
  Favorite: {
    screen: FavoriteScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Article: {
    screen: ArticleScreen,
    navigationOptions: ({ navigation }) => ({
      header: false,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  }
});

const ScanStack = createStackNavigator({
  Scan: {
    screen: ScanScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Article: {
    screen: ArticleScreen,
    navigationOptions: ({ navigation }) => ({
      header: false,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  }
});
export const createRootNavigator = () => {
  return createStackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      FavoriteStack: {
        screen: FavoriteStack,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal"
    }
  );
};
