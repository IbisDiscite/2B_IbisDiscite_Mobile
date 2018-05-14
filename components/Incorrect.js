import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Button } from 'react-native-elements';

import GlRequest from './graphQLUtils';

import HamburguerLogo from './HeaderComponents'

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

export default class Incorrect extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Exercises',
    headerTintColor: 'whitesmoke',
    headerStyle: {
      backgroundColor: '#000158'
    },
  });

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.containerOne}>
        <Text style = {styles.text}>🚀Incorrect answer!!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a899c',
    justifyContent: 'center',
  },
  containerOne: {
    flex: 1,
    backgroundColor: '#8a899c',
  },
  text: {
    backgroundColor: '#8a899c',
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
})
