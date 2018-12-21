import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { Icon } from "react-native-elements";
import ScanBrackets from "../components/ScanBrackets";
import Overbox from "../components/Overbox";

export default class ScanScreen extends Component {
  state = {
    hasCameraPermission: null,
    lastScanned: "message test",
    searchingItem: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={styles.preview}
        >
          <ScanBrackets />
          {this.state.lastScanned !== null && (
            <Overbox>
              {this.state.searchingItem ? (
                <ActivityIndicator size="large" color="#020202" />
              ) : (
                <Text style={{ color: "#020202" }}>
                  {this.state.lastScanned}
                </Text>
              )}
            </Overbox>
          )}
        </BarCodeScanner>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    if (this.state.lastScanned !== data) {
      this.setState({ searchingItem: true });
      setTimeout(() => {
        this.setState({ lastScanned: data, searchingItem: false });
      }, 2500);
    }
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  preview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
