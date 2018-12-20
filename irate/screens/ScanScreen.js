import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { Icon } from "react-native-elements";

export default class ScanScreen extends Component {
  state = {
    hasCameraPermission: null
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
          <View style={styles.scanBorderContainer}>
            <View style={styles.scanBorderLeft} />
            <View style={styles.scanBorderRight} />
          </View>
        </BarCodeScanner>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   title: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10
//   }
// });
