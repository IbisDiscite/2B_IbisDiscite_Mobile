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
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#565656'
    },
  });

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.text}>Incorrect answer!!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeaeae',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: '#aeaeae',
    textAlign: 'center',
    color: '#00283F',
    fontSize: 30,
    padding: 10,
    fontWeight: 'bold',
  },
})
