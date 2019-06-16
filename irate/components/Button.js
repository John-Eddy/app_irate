import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import colors from "../config/colors";



class Button extends React.Component {
    
   
  render() {
    const { label, onPress, processing} = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{label}</Text> 
        {processing  &&  <ActivityIndicator />
}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.JAUNE,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)"
  },
  text: {
    color: colors.BLACK,
    textAlign: "center",
    height: 20
  }
});

export default Button;
