import React, { Component } from 'react';
import {View, Button, AsyncStorage} from 'react-native';
import * as appConst from '../../appConst';

export default class SignInScreen extends Component {
    static navigationOptions = {
      title: 'Please sign in',
    }; 

    state = {
      
      usersList: [
        'e.rahmani@sciencesu-lyon.fr',
        'l.abdelkassa@sciencesu-lyon.fr',
        'm.malosse@sciencesu-lyon.fr',
        'e.dimino@sciencsu-lyon.fr',
      ],
    };
  
    _signInAsync = async (email) => {
      console.log('singin : ' + email );
      console.log(appConst.API_URL + 'login/' + email);
      await fetch(url)
          .then( (response) => {
            console.log(response);
          })    
          .then((responseJson) => {
            console.log(responseJson)
            
            this.setState({  article: responseJson, searchingArticle: false });
          })
          .catch(response => {
            console.log("erreur : ");
            console.log(response)
             this.setState({ searchingArticle: false });
          })

      await AsyncStorage.setItem('userToken', email);
      
      console.log('SAVING')
      this.props.navigation.navigate('App');
    }; 
    
    render() {
      console.log("render login")
      const {usersList} = this.state; 
      const userPicker = [];

      for(let email of usersList) {
        console.log(email);
        let but = <Button title={email} onPress={() => this._signInAsync(email)} /> ;
        userPicker.push(but)
      }
      return (
        <View>
          {userPicker}
        </View>
      );
    }
  
   
} 