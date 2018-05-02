import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableHighlight,TextInput ,Image, StyleSheet, Text, View, Header, ActivityIndicator, Alert } from 'react-native';
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
      backgroundColor: '#000158'
    },
    /*headerRight:
      <HamburguerLogo />,*/
  });

  constructor(props){
    super(props);
    this.state ={ isLoading: true, user: '', pass: ''}
  }

  render() {
      console.log("PROPS DEL LOGIN:")
      console.log(this.state)
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Welcome to IbisDiscite, please log in</Text>
          <View style={styles.container}>
          <TextInput
            style={{height: 50, textAlign: 'center'}}
            placeholder="Account"
            onChangeText={(user) => this.setState({user})}
          />
          <TextInput
            secureTextEntry={true}
            style={{height: 50, textAlign: 'center'}}
            placeholder="Password"
            onChangeText={(pass) => this.setState({pass})}
          />
          </View>
          <View style={styles.container}>
            <Button
              raised
              fontSize={20}
              icon={{name: 'launch'}}
              backgroundColor={'#397af8'}
              borderRadius={8}
              title="Log in"
              onPress={() =>this.props.navigation.navigate('Home',{user: this.state.user, pass: this.state.pass})}
            />
          </View>
        </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a899c',
    justifyContent: 'center',
  },
  hitext: {
    backgroundColor: 'whitesmoke',
    color: '#64FE2E',
  },
  text: {
    backgroundColor: '#8a899c',
    color: 'black',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  item: {
    textAlign: 'center',
    left: 8,
    right: 15,
    borderRadius: 5,
    backgroundColor: '#397af8',
    color: 'whitesmoke',
    fontSize: 20,
    padding: 10,
  },
})
