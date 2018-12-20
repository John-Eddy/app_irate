import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createRootNavigator } from "./router";
import { createAppContainer } from "react-navigation";

//const appNavigator = createRootNavigator();

const app = createAppContainer(createRootNavigator());

export default app;
