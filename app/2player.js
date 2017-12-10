import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
export default class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      player1Text : "Hit To Start!",
      player2Text : "Hit To Start!"
      };
  }
  countDown;
  stage = "INIT"; // INIT, COUNTER, READY, WHITE, BREAK,
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  counter = 3;
  isReadyPlayer1 = false;
  isReadyPlayer2 = false;

  player1Click = () => {
    switch (this.stage) {
      case "INIT":
          this.isReadyPlayer1 = true;
          this.setState({player1Text: "Ready!"})
          if (this.isReadyPlayer2) {
            this.stage = "COUNTER";
            this.setState({player1Text: this.counter})
            this.setState({player2Text: this.counter})
            countDown = setInterval( () => {
              this.setCounterPassed();
           },1000);
          }
          break;
      case "COUNTER":
          break;
      case "READY":
          this.scorePlayer1++;
          this.setState({player1Text: this.scorePlayer1})
          break;
        default:
          break;
      }
  }

  player2Click = () => {
    switch (this.stage) {
      case "INIT":
        this.isReadyPlayer2 = true;
        this.setState({player2Text: "Ready!"})
        if (this.isReadyPlayer1) {
          this.stage = "COUNTER";
          this.setState({player1Text: this.counter})
          this.setState({player2Text: this.counter})
          countDown = setInterval( () => {
            this.setCounterPassed();
         },1000);
        }
        break;
      case "COUNTER":
        break;
      case "READY":
        this.scorePlayer2++;
        this.setState({player2Text: this.scorePlayer2})
        break;
      default:
        break;
    }
  }


  setCounterPassed = () => {
    this.counter--;
    if(this.counter<0){
      clearInterval(countDown);
      this.setState({player1Text: "Hit When White!"})
      this.setState({player2Text: "Hit When White!"})
      this.stage = "READY";
    }
    else if(this.counter==0){
      this.setState({player1Text: "GO!"})
      this.setState({player2Text: "GO!"})
    }
    else {
      this.setState({player1Text: this.counter})
      this.setState({player2Text: this.counter})
    }
  }
  

  render() {
    return (
      <LinearGradient
      colors={["#E96443", "#904E95"]}
      style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          hidden={true}
          translucent={true}>
        </StatusBar>
        <TouchableOpacity style={styles.button} onPressIn={this.player1Click}>
          <Text style={[styles.buttonText,{transform: [{ rotate: '180deg'}]}]}> {this.state.player1Text} </Text>
        </TouchableOpacity>
        <Text style={[styles.judgeText,{transform: [{ rotate: '180deg'}]}]}> timer </Text>
        <Text style={styles.judgeText}> timer </Text>
        <TouchableOpacity style={styles.button} onPressIn={this.player2Click}>
          <Text style={styles.buttonText}> {this.state.player2Text} </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#263238"
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
