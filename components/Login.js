import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableHighlight,TextInput ,Image, StyleSheet, Text, View, Header, ActivityIndicator } from 'react-native';
import {Button} from 'react-native-elements'

import HamburguerLogo from './HeaderComponents'

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

export default class Login extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'IbisDiscite',
    headerTintColor: 'whitesmoke',
    headerStyle: {
      backgroundColor: '#FF4000'
    },
    headerRight:
      <HamburguerLogo />,
  });

  constructor(props){
    super(props);
    this.state ={ isLoading: true, user: '', pass: ''}
  }

  render() {
      console.log("PROPS DEL LOGIN:")
      console.log(this.props)
      return (
        <View style={styles.container}>

          <Text style={styles.text}>Welcome to IbisDiscite, please log in</Text>
          <TextInput
            style={{height: 40}}
            placeholder="Account"
            onChangeText={(user) => this.setState({user})}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Password"
            onChangeText={(pass) => this.setState({pass})}
          />
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Home',{user: this.state.user, pass: this.state.pass})}
          >
            <Text style={styles.item}>Log in</Text>
          </TouchableHighlight>
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
  item: {
    left: 8,
    right: 15,
    borderRadius: 5,
    backgroundColor: '#397af8',
    color: 'whitesmoke',
    fontSize: 20,
    padding: 10,
  }
})
