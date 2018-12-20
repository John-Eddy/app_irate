import React from "react";
import { StyleSheet, View } from "react-native";

const ScanBrackets = () => {
  return (
    <View style={styles.scanBorderContainer}>
      <View style={styles.scanBorderLeft} />
      <View style={styles.scanBorderRight} />
    </View>
  );
};

export default ScanBrackets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  preview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  scanBorderContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  scanBorderLeft: {
    height: 200,
    width: 50,
    borderWidth: 4,
    borderColor: "#ffffff",
    borderRadius: 5,
    margin: 100,
    borderRightWidth: 0
  },
  scanBorderRight: {
    height: 200,
    width: 50,
    borderWidth: 4,
    borderColor: "#ffffff",
    borderRadius: 5,
    margin: 100,
    borderLeftWidth: 0
  }
});
