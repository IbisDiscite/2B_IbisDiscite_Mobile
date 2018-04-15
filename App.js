import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ApolloClient} from 'apollo-client';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-link-http';
import  { ApolloProvider, graphql } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory'

import ExamplesView from "./components/Examples"
import HomeView from "./components/Home"
import UnitResults from "./components/Units"

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;


const client = new ApolloClient({
    link: new HttpLink({
      uri: 'http://35.185.3.235:5000/graphiql'
    }),
    cache: new InMemoryCache(),
});

export default class App extends React.Component {
  render() {
    console.log("dasdasdsadasdsad")
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
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
