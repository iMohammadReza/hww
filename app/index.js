import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import HomeScreen from "./App.js";
import TwoPlayer from "./2player.js";
import FourPlayer from "./2player.js";

const HomeScreenRouter = StackNavigator({
  Home: {screen: HomeScreen},
  TwoPlayer: {screen: TwoPlayer},
  FourPlayer: {screen: FourPlayer}
 },{
  headerMode: 'none'
 });

export default HomeScreenRouter;
