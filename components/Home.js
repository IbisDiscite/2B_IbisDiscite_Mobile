import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableHighlight, Image, StyleSheet, Text, View, Header } from 'react-native';
import {Button} from 'react-native-elements'

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
      <Text style={styles.text}>🚀If you wanna see all units from our App, so you can learn what you want, press here</Text>
        <Button
          raised
          fontSize={20}
          icon={{name: 'cached'}}
          backgroundColor={'#397af8'}
          borderRadius={8}
          title="View Examples"
          onPress={() => this.props.navigation.navigate('Examples')}
        />
      <Text style={styles.text}>🚀If you wanna see all units from our App, so you can learn what you want, press here</Text>
        <Button
          raised
          fontSize={20}
          icon={{name: 'class'}}
          backgroundColor={'#397af8'}
          borderRadius={8}
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
    backgroundColor: 'whitesmoke',
  },
  hitext: {
    backgroundColor: 'whitesmoke',
    color: '#64FE2E',
  },
  text: {
    backgroundColor: 'whitesmoke',
    color: 'black',
    fontSize: 15,
    padding: 10,
  },
})

export default HomeView
