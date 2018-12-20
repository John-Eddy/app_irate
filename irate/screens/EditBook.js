import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Vibration } from "react-native";

export default class EditBook extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Salut Marc Elian et Liza !</Text>
        <Button
          title="Back To books"
          onPress={() => this.props.navigation.navigate("Tabs")}
        />
        <Button title="Vibré " onPress={() => Vibration.vibrate(3000)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
