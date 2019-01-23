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
    searchingItem: false,
    article: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission, article } = this.state;

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
          {this.state.lastScanned !== null && article  && (
            <Overbox>
              {this.state.searchingItem ? (
                <ActivityIndicator size="large" color="#020202" />
              ) : (
                <View>
                <Text style={{ color: "#020202" }}>
                  Code : {this.state.lastScanned}
                </Text>
                <Text style={{ color: "#020202" }}>
                 {this.state.article.brand}
              </Text>
                <Text style={{ color: "#020202" }}>
                {article.name} 
              </Text>
              </View>
              )}
            </Overbox>
          )}
        </BarCodeScanner>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({lastScanned: data});
    if (!this.state.searchingItem) {
      this.setState({ searchingItem: true });

        const url = 'http://192.168.1.55:8888/admin_iRate/public/api/searchArticle/' + data;
        console.log(url)
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            
            this.setState({  article: responseJson, searchingItem: false });
          })
      // this.setState({ searchingItem: true });
      // setTimeout(() => {
      //   this.setState({ lastScanned: data, searchingItem: false });
      // }, 2500);
    } else {
      this.setState({ searchingItem: false }); 

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
