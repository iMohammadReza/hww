import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
//import Tapsell from 'react-native-tapsell'

export default class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
    };
  }

  /*componentWillMount = () => {
    Tapsell.initialize("stphtqhosdacbsecddhjplpsrbbamkmikclrdcpqaadcndtidensigoqelcrfddrtslcjs")
  }*/
  aboutPress = () => {

  }

  render() {
    return (
     <LinearGradient
        colors={["#E96443", "#904E95"]}
        style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}>
        </StatusBar>
        <View style={styles.titleContainer} >
          <Text style={styles.title} >HIT{"\n"}WHEN{"\n"}WHITE</Text>
        </View>
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("TwoPlayer")} >
            <Text style={styles.buttonText} > Classic </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("FourPlayer")} >
            <Text style={styles.buttonText} >Extreme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("FourPlayer")} >
            <Text style={styles.buttonText} >Colorful</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.aboutPress} >
            <Text style={styles.buttonTextAbout}>About!</Text>
          </TouchableOpacity>
        </View>

    </LinearGradient>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 32
  },
  title: {
    color: "white",
    fontFamily: "Roboto-Thin",
    textAlign: "center",
    fontSize: 45,
    borderWidth: 2,
    borderColor: "white",
    padding: 20
  },
	listContainer: {
		flex: 1,
		marginTop: 32,
		alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
	},
  button: {
    backgroundColor: "white",

    borderWidth: 2,
    borderColor: "white",
    margin:5,
    top: 0
  },
  buttonText: {
    color: "#904E95",
    fontFamily: "Roboto-Thin",
    //textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 26,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonTextAbout: {
    color: "#904E95",
    fontFamily: "Roboto-Thin",
    //textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 20,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20
  }
});
