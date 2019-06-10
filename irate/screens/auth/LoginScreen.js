import React, { Component } from 'react';
import {View, Button, AsyncStorage} from 'react-native';

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
      console.log('singin : ' + email)

      await AsyncStorage.setItem('userToken', email);
      console.log('SAVING')
      this.props.navigation.navigate('App');
    }; 
    
    render() {
      console.log("render login")
      const {usersList} = this.state; 
      const userPicker = [];

      for(email of usersList) {
        userPicker.push(<Button title={email} onPress={() => this._signInAsync(email)} /> )
      }
      return (
        <View>
          {userPicker}
        </View>
      );
    }
  
   
} 