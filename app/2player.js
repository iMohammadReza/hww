import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          hidden={true}
          translucent={true}>
        </StatusBar>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.buttonText,{transform: [{ rotate: '180deg'}]}]}> timer </Text>
        </TouchableOpacity>
        <Text style={[styles.judgeText,{transform: [{ rotate: '180deg'}]}]}> timer </Text>
        <Text style={styles.judgeText}> timer </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> timer </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263238"
  },
  button: {
    flex:1,
    margin:20,
		alignItems: 'center',
		justifyContent: 'center',
    borderColor: "white",
    borderWidth: 3
  },
  judgeText: {
    color: "white",
    textAlign: "center",
    fontSize: 25
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 45
  }
});
