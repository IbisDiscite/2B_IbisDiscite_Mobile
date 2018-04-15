import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import  {Query} from 'react-apollo';
import { ApolloClient} from 'apollo-client';
import { graphql } from 'react-apollo';
import { StackNavigator } from 'react-navigation';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import client from '../App.js';

import HamburguerLogo from './HeaderComponents'

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;
// Define query types
const UNIT_QUERY = gql`
  query units {
    allUnits {
      nombre
    }
  }
`;

/*const Units = () => (
  <Query query = {UNIT_QUERY}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <ActivityIndicator color="blue"/>
        )
      }
      if (error) {
        return (
          <Text>{`Error: ${error}`}</Text>
        )
      }

      return (
        data.un.map(({nombre}) => (
          <View key={nombre}>
            <Text>{`${nombre}`}</Text>
          </View>
        ))
      )
    }}
  </Query>
)*/

const Units = () => (
  <Query query = {UNIT_QUERY}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <ActivityIndicator color="blue"/>
        )
      }
      if (error) {
        return (
          <Text>{`Error: ${error}`}</Text>
        )
      }

      return (
        data.un.map(({nombre}) => (
          <View key={nombre}>
            <Text>{`${nombre}`}</Text>
          </View>
        ))
      )
    }}
  </Query>
)


export default class UnitResults extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'IbisDiscite',
    headerTintColor: 'whitesmoke',
    headerStyle: {
      backgroundColor: '#FF4000'
    },
    headerRight:
      <HamburguerLogo />,
  });
  render() {
    return (
      <View style={styles.container}>
        <Units />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  text: {
    backgroundColor: 'whitesmoke',
    color: '#64FE2E',
    fontSize: 24,
    padding: 10,
  },
})
