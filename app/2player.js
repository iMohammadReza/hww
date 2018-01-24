import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/Feather';

export default class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      player1Text : "Hit To Start!",
      player2Text : "Hit To Start!",
      gradient : ["#E96443", "#904E95"],
      button1Color : "#ffffff",
      button2Color : "#ffffff",
      buttonControl : "#ffffff",
      stage: "INIT", // INIT, COUNTER, READY, WHITE, BREAK, FINISHED
    }
  }
  countDown;
  whiterTimer;
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  counter = 3;
  isReadyPlayer1 = false;
  isReadyPlayer2 = false;

  player1Click = () => {
    switch (this.state.stage) {
      case "INIT":
          this.isReadyPlayer1 = true;
          this.setState({player1Text: "Ready!"})
          if (this.isReadyPlayer2) {
            this.setState({stage:"COUNTER", player1Text: this.counter, player2Text: this.counter})
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
        clearTimeout(whiterTimer)
        this.setWhiter()
        break;
      case "BREAK":
          break;
      case "FINISHED":
          break;
      default:
        break;
    }
    if(this.scorePlayer1>9 || this.scorePlayer1<-9){
      this.finishGame()
    }
  }

  player2Click = () => {
    switch (this.state.stage) {
      case "INIT":
        this.isReadyPlayer2 = true;
        this.setState({player2Text: "Ready!"})
        if (this.isReadyPlayer1) {
          this.setState({stage:"COUNTER", player1Text: this.counter, player2Text: this.counter})
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
      case "BREAK":
          break;
      case "FINISHED":
          break;
      default:
        break;
    }
    if(this.scorePlayer2>9 || this.scorePlayer2<-9){
      this.finishGame()
    }
  }

  finishGame = () => {
    if(this.scorePlayer1>9 || this.scorePlayer2<-9){
      this.setState({stage:"FINISHED", player1Text: "Winner!", player2Text: "Loser!", button1Color: "#4caf50", button2Color: "#f44336", gradient: ["#ffffff", "#ffffff"], buttonControl: "#904E95"})
    }else if(this.scorePlayer2>9 || this.scorePlayer1<-9){
      this.setState({stage:"FINISHED", player1Text: "Loser!", player2Text: "Winner!", button1Color: "#f44336", button2Color: "#4caf50", gradient: ["#ffffff", "#ffffff"], buttonControl: "#904E95"})
    }
    clearTimeout(whiterTimer)
  }

  pauseGame = () => {
    try {
      clearTimeout(whiterTimer)
    } catch (error) {}
    this.setState({stage: "BREAK", player1Text: "Paused!", player2Text: "Paused!"})
  }

  resumeGame = () => {
    try {
      clearTimeout(whiterTimer)
    } catch (error) {}
    this.setState({stage: "READY", player1Text: this.scorePlayer1, player2Text: this.scorePlayer2})
    this.setWhiter()
  }

  stopGame = () => {

  }

  setWhiter = () => {
    this.setState({stage: "READY", gradient: ["#E96443", "#904E95"], button1Color: "#ffffff", button2Color: "#ffffff", buttonControl: "#ffffff"})
    whiterTimer = setTimeout( () => {
      this.setState({stage: "WHITE", gradient: ["#ffffff", "#ffffff"], button1Color: "#904E95",  button2Color: "#904E95", buttonControl: "#904E95"})
    },Math.floor(Math.random()*6000)+700);
  }

  setCounterPassed = () => {
    this.counter--;
    if(this.counter<0){
      clearInterval(countDown);
      this.setState({stage: "READY", player1Text: "Hit When White!", player2Text: "Hit When White!"})
      this.setWhiter()
    }
    else if(this.counter==0){
      this.setState({player1Text: "GO!", player2Text: "GO!"})
    }
    else {
      this.setState({player1Text: this.counter, player2Text: this.counter})
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
        borderWidth: 3
      },
      judgeText: {
        color: "white",
        fontFamily: "Roboto-Thin",
        textAlign: "center",
        fontSize: 50
      },
      buttonText: {
        textAlign: "center",
        fontFamily: "Roboto-Thin",
        fontSize: 45
      }
    });
    console.log(this.state.stage)
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
        <TouchableOpacity style={[styles.button,{borderColor: this.state.button1Color}]} onPressIn={this.player1Click}>
          <Text style={[styles.buttonText,{transform: [{ rotate: '180deg'}],color: this.state.button1Color}]}> {this.state.player1Text} </Text>
        </TouchableOpacity>
        {this.state.stage != "INIT" && this.state.stage != "COUNTER" ?
            this.state.stage != "BREAK"
            ?
            <View style={{justifyContent: "space-around", flexDirection: "row"}}>
              <TouchableOpacity onPressIn={this.pauseGame}>
                <Icon style={[styles.judgeText,{color: this.state.buttonControl}]} name="pause" size={10} />
              </TouchableOpacity>
            </View>
            :
            <View style={{justifyContent: "space-around", flexDirection: "row"}}>
              <TouchableOpacity onPressIn={this.resumeGame}>
                <Icon style={[styles.judgeText,{color: this.state.buttonControl}]} name="play" size={10} />
              </TouchableOpacity>
              <TouchableOpacity onPressIn={this.stopGame}>
                <Icon style={[styles.judgeText,{color: this.state.buttonControl}]} name="x" size={10} />
              </TouchableOpacity>
            </View>
          :
          null
        }
        <TouchableOpacity style={[styles.button,{borderColor: this.state.button2Color}]} onPressIn={this.player2Click}>
          <Text style={[styles.buttonText,{color: this.state.button2Color}]}> {this.state.player2Text} </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
