import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ApolloClient} from 'apollo-client';

import ExamplesView from "./components/Examples"
import HomeView from "./components/Home"
import UnitResults from "./components/Units"
import UnitWithId from "./components/UnitWithId"
import Login from "./components/Login"
import Lesson from "./components/Lesson"
import ListExamples from "./components/ListExamples"
import Exercises from "./components/Exercises"
import Correct from "./components/Correct"
import Incorrect from "./components/Incorrect"
import About from "./components/About"

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
    Login: {
      screen: Login,
    },
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
    Lesson: {
      screen: Lesson,
    },
    ListEx: {
      screen: ListExamples,
    },
    Exercises: {
      screen: Exercises,
    },
    Correct: {
      screen: Correct,
    },
    Incorrect: {
      screen: Incorrect,
    },
    About: {
      screen: About,
    },
  },
  {
    initialRouteName: 'Login',
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
