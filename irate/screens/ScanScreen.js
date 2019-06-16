import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, AsyncStorage} from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { Icon } from "react-native-elements";
import ScanBrackets from "../components/ScanBrackets";
import Overbox from "../components/Overbox";
import * as appConst from "../appConst";

export default class ScanScreen extends Component {

  
    state = {
      hasCameraPermission: null,
      lastScanned: "message test",
      searchingArticle: false,
      article: null,
      user: null
    };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });

    const userJson = await AsyncStorage.getItem('user');
    const user = JSON.parse(userJson);
    this.setState({user: user});

  }

  handleBarCodeScanned = ({ type, data }) => {
    
    if (!this.state.searchingArticle && data != this.state.lastScanned) {

      this.setState({ searchingArticle: true, lastScanned: data });

        const url = appConst.API_URL + 'searchArticle/' + this.state.user.id + "/" + data;
        console.log(url)
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {            
            this.setState({  article: responseJson, searchingArticle: false });
          })
          .catch(response => {
            console.log("erreur : ");
            console.log(response)
             this.setState({ searchingArticle: false });
          })
    } 
  };

  handlePress = () => {
    this.props.navigation.navigate("Article", { article: this.state.article })
  }

  render() {
    const { hasCameraPermission, article, searchingArticle } = this.state;

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
        {(searchingArticle || article ) && (
          <Overbox>
            {searchingArticle && (
              <ActivityIndicator size="large" color="#020202" />
            )}
            { article && (
                  
                  
              <TouchableOpacity style={styles.articleInfos} onPress={this.handlePress}> 
                  <Text style={styles.brandName}>{article.brand}</Text>
                  <Text style={styles.articleName}>{article.designation}</Text>
              </TouchableOpacity> 
            )}
            </Overbox>
           )}
        </BarCodeScanner>
      </View>
    );
  }
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
  articleInfos: {
    display: "flex",
    flexDirection: "column"
  },
  brandName: {
    color: "#020202" ,
    fontSize: 25,
    fontWeight: "500",
  },
  articleName: { 
    color: "#020202",
    fontSize: 18,
    fontWeight: "400",
  }
});
