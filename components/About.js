import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Icon } from 'react-native-elements'

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
        <Text></Text>
        <Text style={styles.text}>Have you ever wonder why you dont understand English? {"\n"} {"\n"}
          There might be a simple reason, Ibis Discite is
          an application that will teach you the proper grammar
          for different subjects and situations, so you always know
          what, and how to use it correctly.
        </Text>
        <View style={styles.infoContainer}>
          <Icon
            raised
            name='email'
            color='white'
            size={30}
            containerStyle={{
              backgroundColor: '#00283F'
            }}
            onPress={() => {
              Alert.alert(
                'Email-to:',
                'Dafrodriguezro@unal.edu.co\nPcberriop@unal.edu.co\nJoahernandezca@unal.edu.co\nSagilm@unal.edu.co\nJnsastoque@unal.edu.co'
            )}} />
          <Icon
            raised
            name='info'
            color='white'
            size={30}
            containerStyle={{
              backgroundColor: '#00283F'
            }}
            onPress={() => {Alert.alert(
                'Mision:',
                'We only want to teach you english, so come on and learn with us',
                [
                  {text: 'Meh, i do not want to learn!'},
                  {text: 'Ok, lets go!', onPress: () => this.props.navigation.navigate('Login')},
                ]
            )}} />
        </View>
        <View style={styles.rightsContainer}>
          <Text style={styles.bottomText}>{'\u00A9'} CopyRight Ibis Discite All Rights Reserved. </Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeaeae',
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#aeaeae',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
  },
  rightsContainer:{
    top: 150,
    flex: 1,
    backgroundColor: '#aeaeae',
  },
  text: {
    backgroundColor: '#aeaeae',
    color: 'black',
    fontSize: 20,
    padding: 10,
    textAlign: 'auto',
    borderWidth: 0.5,
    borderColor: '#00283F',
  },
  bottomText: {
    backgroundColor: '#aeaeae',
    color: '#6f7476',
    textAlignVertical: 'bottom',
  },
})
