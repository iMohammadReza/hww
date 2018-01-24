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
      isBreak: false
      };
  }
  countDown;
  whiterTimer;
  stage = "INIT"; // INIT, COUNTER, READY, WHITE, BREAK, FINISHED
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
    this.stage ="FINISHED"
    if(this.scorePlayer1>9 || this.scorePlayer2<-9){
      this.setState({player1Text: "Winner!", player2Text: "Loser!", button1Color: "#4caf50", button2Color: "#f44336", gradient: ["#ffffff", "#ffffff"], buttonControl: "#904E95"})
    }else if(this.scorePlayer2>9 || this.scorePlayer1<-9){
      this.setState({player1Text: "Loser!", player2Text: "Winner!", button1Color: "#f44336", button2Color: "#4caf50", gradient: ["#ffffff", "#ffffff"], buttonControl: "#904E95"})
    }
    clearTimeout(whiterTimer)
  }

  pauseGame = () => {
    //clearTimeout(whiterTimer)
    this.stage = "BREAK"
    this.setState({isBreak: true})
  }

  resumeGame = () => {
    //clearTimeout(whiterTimer)
    this.stage = "READY"
    this.setState({isBreak: false})
    this.setWhiter()
  }

  stopGame = () => {

  }

  setWhiter = () => {
    this.stage = "READY"
    this.setState({gradient: ["#E96443", "#904E95"], button1Color: "#ffffff", button2Color: "#ffffff", buttonControl: "#ffffff"})
    whiterTimer = setTimeout( () => {
      this.stage = "WHITE"
      this.setState({gradient: ["#ffffff", "#ffffff"], button1Color: "#904E95",  button2Color: "#904E95", buttonControl: "#904E95"})
    },Math.floor(Math.random()*6000)+700);
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
        { !this.state.isBreak
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
        }
        <TouchableOpacity style={[styles.button,{borderColor: this.state.button2Color}]} onPressIn={this.player2Click}>
          <Text style={[styles.buttonText,{color: this.state.button2Color}]}> {this.state.player2Text} </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
