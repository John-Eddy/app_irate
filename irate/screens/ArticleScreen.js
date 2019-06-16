import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Vibration } from "react-native";
import * as appConst from "../appConst"

export default class ArticleBook extends Component {

  state = {
    loading: false
  }
 
  componentDidMount(){  ƒ
    const article = this.props.navigation.getParam("article"); 

    const url = appConst.API_URL + 'getArticle/' + article.id;
    
    fetch(url)
      .then( (response) => {
        console.log(response.status);
      })
  }
 
 
  render() {
    const article = this.props.navigation.getParam("article");
    return (
      <View>
        <View style={styles.articleInfos} onPress={this.handlePress}> 
            <Text style={styles.brandName}>{this.props.article.brand}</Text>
            <Text style={styles.articleName}>{this.props.article.designation}</Text>
        </View> 
      
          onPress={() => this.props.navigation.navigate("Tabs")}
        />
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
