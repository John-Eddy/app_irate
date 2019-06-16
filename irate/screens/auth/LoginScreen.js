import * as React from "react";
import { Image, StyleSheet, View, Text, AsyncStorage } from "react-native";
import Button from "../../components/Button";
import FormTextInput from "../../components/FormTextInput";
import imageLogo from "../../assets/images/logo.png";
import colors from "../../config/colors";
import strings from "../../config/strings";
import * as appConst from '../../appConst';

class LoginScreen extends React.Component {
  
  state = {
    email: "rahmanieddy@gmail.com",
    connectionRefused: false,
    processing: false
  };

  handleEmailChange = (email) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleLoginPress = () => {
    
    this.setState({processing:true});

    const {email} = this.state;

    console.log('Login : ' + email );

      const url = appConst.API_URL + 'login2/' + email;
      fetch(url)
          .then((response) => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
          })
          .then( (response) => {
           const status = response[0];

            if (status == 200) {
              const user = response[1];
              console.log("Authorized, saving User info");
              AsyncStorage.multiSet([ ['userToken', email], ['user', JSON.stringify(user)]],  () =>  
                this.props.navigation.navigate('App'))
                this.setState({ connectionRefused: false, processing:false });
              ;
              //await AsyncStorage.setItem('userToken', email); 
              //console.log("saved")

            } else {
              console.log("Unauthaurized")
              this.setState({ connectionRefused: true, processing:false });
            }

          })    
          
          .catch(response => {
            console.log("erreur : ");
            console.log(response)
          })
  };

  render() {
    const {connectionRefused, processing} = this.state;
    const  onPress = processing ? null : this.handleLoginPress;

    return (
      <View style={styles.container}>
        {/* <Image source={imageLogo} style={styles.logo} /> */}
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            placeholder={strings.EMAIL_PLACEHOLDER}
          />
      
          {connectionRefused && <Text style={styles.errorText}>{strings.CONNECTION_REFUSED}</Text>}
          
          <Button label={strings.LOGIN} onPress={onPress} processing={processing} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  },
  errorText: {
    color: colors.TORCH_RED,
    alignSelf: "center",
    marginBottom: 5
  }
});

export default LoginScreen;
