import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";

import Bookcase from "./screens/Bookcase";
import EditBook from "./screens/EditBook";
import Explore from "./screens/Explore";
import ScanScreen from "./screens/ScanScreen";
import Lists from "./screens/Lists";
import Profile from "./screens/Profile";

let screen = Dimensions.get("window");

const Tabs = createBottomTabNavigator({
  Bookcase: {
    screen: Bookcase,
    navigationOptions: {
      tabBarLabel: "Bookcase",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="open-book" type="entypo" size={28} color={tintColor} />
      )
    }
  },
  Explore: {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: "Explore",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="ios-map-outline"
          type="ionicon"
          size={28}
          color={tintColor}
        />
      )
    }
  },
  Scan: {
    screen: ScanScreen,
    navigationOptions: {
      tabBarLabel: "Scanner",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-barcode" type="ionicon" size={28} color="#222" />
      )
    }
  },
  Lists: {
    screen: Lists,
    navigationOptions: {
      tabBarLabel: "Lists",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="list" type="entypo" size={28} color={tintColor} />
      )
    }
  },
  "My Profile": {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="ios-person-outline"
          type="ionicon"
          size={28}
          color={tintColor}
        />
      )
    }
  }
});

export const BookcaseStack = createStackNavigator({
  Bookcase: {
    screen: Bookcase,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  EditBook: {
    screen: EditBook,
    navigationOptions: ({ navigation }) => ({
      header: null,
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
      BookcaseStack: {
        screen: BookcaseStack,
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
