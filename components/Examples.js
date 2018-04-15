import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';

import HamburguerLogo from './HeaderComponents'

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

class ExamplesView extends React.Component {
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
    console.log("dadasdasdasdadadasdasda--------------fasasdasddfashjdkgsajdkh")
    return (
      <View style={styles.container}>
        <Text>Exampleadsdasdasds🚀🦉</Text>
      </View>
    );
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

export default ExamplesView
