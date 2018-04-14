import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

import ExamplesView from "./components/Examples"
import HomeView from "./components/Home"
import UnitResults from "./components/Units"

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}


const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeView,
    },
    Examples: {
      screen: ExamplesView,
    },
    Units: {
      screen: UnitResults,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: 'whitesmoke',
    color: '#4A90E2',
    fontSize: 24,
    padding: 10,
  },
})
