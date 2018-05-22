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
    title: 'Login',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#565656'
    },
    /*headerRight:
      <HamburguerLogo />,*/
  });

  constructor(props){
    super(props);
    this.state ={ isLoading: true, user: '', pass: ''}
  }

  render() {
      /*console.log("PROPS DEL LOGIN:")
      console.log(this.state)*/
      return (
        <View style={styles.container}>
          <Text> </Text>
          <Text style={styles.tittle}>Please log in</Text>
          <View style={styles.container}>
          <TextInput
            style={{height: 50, textAlign: 'center', fontSize: 20, textColor: '#0b2b3e'}}
            placeholder="Account"
            placeholderTextColor="#0b2b3e"
            onChangeText={(user) => this.setState({user})}
          />
          <TextInput
            secureTextEntry={true}
            style={{height: 50, textAlign: 'center', fontSize: 20}}
            placeholder="Password"
            placeholderTextColor="#0b2b3e"
            onChangeText={(pass) => this.setState({pass})}
          />
          </View>
          <View style={styles.container}>
            <Button
              raised
              fontSize={20}
              icon={{name: 'launch'}}
              backgroundColor={'#00283F'}
              borderRadius={8}
              title="Log in"
              onPress={() =>this.props.navigation.navigate('Home',{user: this.state.user, pass: this.state.pass})}
            />
            <Text> </Text>
            <Button
              raised
              fontSize={20}
              icon={{name: 'face'}}
              backgroundColor={'#00283F'}
              borderRadius={8}
              title="About"
              onPress={() =>this.props.navigation.navigate('About')}
            />
          </View>
        </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeaeae',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: '#8a899c',
    color: 'black',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  tittle: {
    color: '#0b2b3e',
    fontSize:30,
    borderColor: 'black',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
