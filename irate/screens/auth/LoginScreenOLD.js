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
  
    _signInAsync =  (email) => {
      console.log('Login : ' + email );

      const url = appConst.API_URL + 'login2/' + email;
      fetch(url)
          .then( (response) => {
            if (response.status === 200) {
              console.log("Authorized, saving User info");
              AsyncStorage.setItem('userToken', email).then( () =>  this.props.navigation.navigate('App'));

            } else {
              
            }

          })    
          
          .catch(response => {
            console.log("erreur : ");
            console.log(response)
          })

      
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