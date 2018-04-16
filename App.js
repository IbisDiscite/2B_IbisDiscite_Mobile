import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ApolloClient} from 'apollo-client';

import ExamplesView from "./components/Examples"
import HomeView from "./components/Home"
import UnitResults from "./components/Units"
import UnitWithId from "./components/UnitWithId"

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;



export default class App extends React.Component {
  render() {
    return (
        <RootStack />
    );
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
    UnitId: {
      screen: UnitWithId,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  text: {
    backgroundColor: 'whitesmoke',
    color: 'black',
    fontSize: 15,
    padding: 10,
  },
})
