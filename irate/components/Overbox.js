import React from "react";
import { StyleSheet, View } from "react-native";

const Overbox = props => {
  return <View style={styles.container}>{props.children}</View>;
};

export default Overbox;
const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    backgroundColor: "#ffffff",
    minHeight: 50,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center"
  }
});
