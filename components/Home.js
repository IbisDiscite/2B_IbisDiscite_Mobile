import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableHighlight, Button, Image, StyleSheet, Text, View, Header } from 'react-native';

import HamburguerLogo from './HeaderComponents'

class HomeView extends React.Component {
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
        <Button
          title="View Examples"
          onPress={() => this.props.navigation.navigate('Examples')}
        />
        <Button
          title="View Units"
          onPress={() => this.props.navigation.navigate('Units')}
        />
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

export default HomeView
