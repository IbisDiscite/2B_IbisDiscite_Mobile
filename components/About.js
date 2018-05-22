import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements'

import HamburguerLogo from './HeaderComponents'

import GlRequest from './graphQLUtils';

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

export default class About extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'About Us',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#565656'
    },
    /*headerRight:
      <HamburguerLogo />,*/
  });

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Have you ever wonder why you dont understand English?</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>
          There might be a simple reason, Ibis Discite is
          an application that will teach you the proper grammar
          for different subjects and situations, so you always know
          what, and how to use it correctly.
        </Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.bottomText}> CopyRight Ibis Discite All Rights Reserved. </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeaeae',
  },
  text: {
    backgroundColor: '#aeaeae',
    color: 'black',
    fontSize: 20,
    padding: 10,
    textAlign: 'auto',
  },
  bottomText: {
    backgroundColor: '#aeaeae',
    color: '#6f7476',
    textAlignVertical: 'bottom',
  },
})
