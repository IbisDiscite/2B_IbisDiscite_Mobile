import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableHighlight,TextInput ,Image, StyleSheet, Text, View, Header, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import {Button, Icon} from 'react-native-elements'

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
    try{
      AsyncStorage.getItem("token").then((value) => {
          this.setState({
            token: value
          })
      }).done();
    }catch(error){
      console.log("ERROR: ", error)
    }
    AsyncStorage.getItem("client").then((value) => {
        this.setState({
          client: value
        })
    }).done();
    AsyncStorage.getItem("uid").then((value) => {
        this.setState({
          uid: value
        })
    }).done();
    console.log("tok: ", this.state)
  }

  render() {
      /*console.log("PROPS DEL LOGIN:")
      console.log(this.state)*/
      if(this.state.token != null && this.state.client != null && this.state.uid != null){
        this.props.navigation.navigate('Home',{client: this.state.client, token: this.state.token, uid: this.state.uid})
        return(
          <View style={styles.container}>
            <Text style={styles.tittle}>Are You Sure You Want To Sign Out?</Text>
            <Button
              raised
              fontSize={20}
              icon={{name: 'launch'}}
              backgroundColor={'#00283F'}
              borderRadius={8}
              title="Sign Out"
              //onPress={() =>this.props.navigation.navigate('Home',{user: this.state.user, pass: this.state.pass})}
              onPress={() => {
                AsyncStorage.removeItem("client");
                AsyncStorage.removeItem("token");
                AsyncStorage.removeItem("uid");
                this.props.navigation.navigate('Login');
              }}
            />
          </View>
        )
      }
      return (
        <View style={styles.container}>
          <Text> </Text>
          <Text style={styles.tittle}>Please log in</Text>
          <View style={styles.container}>
          <TextInput
            style={{height: 50, textAlign: 'center', fontSize: 20}}
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
          <View style={styles.optionsContainer}>
            <Button
              raised
              fontSize={20}
              icon={{name: 'launch'}}
              backgroundColor={'#00283F'}
              borderRadius={8}
              title="Log in"
              //onPress={() =>this.props.navigation.navigate('Home',{user: this.state.user, pass: this.state.pass})}
              onPress={() => {
                if(this.state.user.length === 0 && this.state.pass.length === 0){
                  Alert.alert(
                    'Warning!',
                    'User cannot be blank!\nPassword cannot be blank!'
                  )
                }else if(this.state.pass.length === 0){
                  Alert.alert(
                    'Warning!',
                    'Password cannot be blank!'
                  )
                }else if(this.state.user.length === 0){
                  Alert.alert(
                    'Warning!',
                    'User cannot be blank!'
                  )
                }else {
                  AsyncStorage.setItem("@user", `${this.state.user}`);
                  Alert.alert(
                    'Confirmation:',
                    `Email: ${this.state.user}\nPassword: ${this.state.pass}`,
                    [
                      {text: 'Cancel'},
                      {text: 'Go!', onPress: () =>this.props.navigation.navigate('Home',{user: this.state.user, pass: this.state.pass})},
                    ]
                  )
                }
              }}
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
  optionsContainer: {
    flex: 1,
    backgroundColor: '#aeaeae',
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
