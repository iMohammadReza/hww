import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export default class App extends Component {
  render() {
    return (
     <LinearGradient
        colors={["#E96443", "#904E95"]}
        style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent={true}>
        </StatusBar>
        <View style={styles.titleContainer} >
          <Text style={styles.title} >HIT{"\n"}WHEN{"\n"}WHITE</Text>
        </View>
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("TwoPlayer")} >
            <Text style={styles.buttonText} >2 Player</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("FoirPlayer")} >
            <Text style={styles.buttonText} >4 Player</Text>
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
	},
  button: {
    backgroundColor: "white",

    borderWidth: 2,
    borderColor: "white",
    margin: 10,
    top: 0
  },
  buttonText: {
    color: "#904E95",
    fontWeight: "bold",
    //textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 30,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  }

});
