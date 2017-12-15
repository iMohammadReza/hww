import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
export default class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      player1Text : "Hit To Start!",
      player2Text : "Hit To Start!",
      gradient : ["#E96443", "#904E95"],
      buttonColor : "#ffffff"
      };
  }
  countDown;
  whiterTimer;
  stage = "INIT"; // INIT, COUNTER, READY, WHITE, BREAK,
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  counter = 3;
  isReadyPlayer1 = false;
  isReadyPlayer2 = false;

  player1Click = () => {
    if(this.scorePlayer1>9 || this.scorePlayer1<0){
      //finish game
    }else{
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
        this.scorePlayer1--;
        this.setState({player1Text: this.scorePlayer1})
        this.setWhiter()
        break;
      case "WHITE":
        this.scorePlayer1++;
        this.setState({player1Text: this.scorePlayer1})
        this.setWhiter()
        break;
        default:
          break;
      }
    }
  }

  player2Click = () => {
    if(this.scorePlayer2>9 || this.scorePlayer2<0){
      //finish game
    }else{
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
          this.scorePlayer2--;
          this.setState({player2Text: this.scorePlayer2})
          clearTimeout(whiterTimer)
          this.setWhiter()
          break;
        case "WHITE":
          this.scorePlayer2++;
          this.setState({player2Text: this.scorePlayer2})
          clearTimeout(whiterTimer)
          this.setWhiter()
          break;
        default:
          break;
      }
    }
    
  }

  setWhiter = () => {
    this.stage = "READY"
    this.setState({gradient: ["#E96443", "#904E95"], buttonColor: "#ffffff"})
    whiterTimer = setTimeout( () => {
      this.stage = "WHITE"
      this.setState({gradient: ["#ffffff", "#ffffff"], buttonColor: "#904E95"})
    },2000);
  }

  setCounterPassed = () => {
    this.counter--;
    if(this.counter<0){
      clearInterval(countDown);
      this.setState({player1Text: "Hit When White!"})
      this.setState({player2Text: "Hit When White!"})
      this.stage = "READY";
      this.setWhiter()
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
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      button: {
        flex:1,
        margin:20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: this.state.buttonColor,
        borderWidth: 3
      },
      judgeText: {
        color: "white",
        textAlign: "center",
        fontSize: 25
      },
      buttonText: {
        color: this.state.buttonColor,
        textAlign: "center",
        fontSize: 45
      }
    });

    return (
      <LinearGradient
      colors={this.state.gradient}
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
