import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableHighlight, Image, StyleSheet, Text, View, Header, ActivityIndicator } from 'react-native';
import {Button} from 'react-native-elements';

import HamburguerLogo from './HeaderComponents';
import Login from './Login';
import GlRequest from './graphQLUtils';

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;


export default class HomeView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'IbisDiscite',
    headerTintColor: 'whitesmoke',
    headerStyle: {
      backgroundColor: '#000158'
    },
  });

  constructor(props){
    super(props);
    this.state ={ isLoading: true, isLoadingL: true, loged: false, error: false, answer: false}
  }

  componentDidMount(){
    var usr = `${this.props.navigation.state.params.user}`.replace("@unal.edu.co","");
    console.log(usr);
    var request = `mutation{
      createSession(session:{
        email: "${this.props.navigation.state.params.user}"
        password: "${this.props.navigation.state.params.pass}"
      }) {
        id
        email
      }
    }`

    var requestLdap = `mutation {
      auth(auth:{
        email: "${usr}",
        password: "${this.props.navigation.state.params.pass}"
      }) {
        email
        answer
      }
    }`
    GlRequest(
      request ,
      (data) => {
        this.setState({
          dataSource: data.createSession,
          isLoading: false,
          loged: true,
        })
      },
      (error) => {
        console.log(error)
        this.setState({
          error: true,
          isLoading: false
        })
      }
    );
    GlRequest(
      requestLdap ,
      (data) => {
        this.setState({
          dataSourceL: data.auth,
          isLoadingL: false,
        })
      },
      (error) => {
      }
    );
  }

  render() {
    /*console.log("PROPS DEL HOME:")
    console.log(this.state)*/
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator/>
          <Text style={styles.text}>Verifying User...</Text>
        </View>
      )
    }
    if(this.state.error){
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Incorrect Email or Password</Text>
          <Button
            raised
            fontSize={20}
            icon={{name: 'class'}}
            backgroundColor={'#397af8'}
            borderRadius={8}
            title="Go Back"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      )
    }
    if(this.state.loged == false){
      return(
          <Login navigation={this.props.navigation}/>
      )
    }
    if(this.state.loged && (this.state.dataSourceL.answer == "true")){
      return (
        <View style={styles.containerOne}>
        <Text style={styles.text}>🚀If you wanna see all units from our App, so you can learn what you want, press here</Text>
        <Text style={styles.text}>Succesfully loged in</Text>
        <View style={styles.container}>
          <Button
            raised
            fontSize={20}
            icon={{name: 'class'}}
            backgroundColor={'#397af8'}
            borderRadius={8}
            title="View Units"
            onPress={() => this.props.navigation.navigate('Units')}
          />
          <Text style={styles.text}></Text>
          <Button
            raised
            fontSize={20}
            icon={{name: 'class'}}
            backgroundColor={'#397af8'}
            borderRadius={8}
            title="View Your lesson of this day"
            onPress={() => this.props.navigation.navigate('Lesson')}
          />
        </View>
        </View>
      );
    }
    if(this.state.loged && (this.state.dataSourceL.answer == "false")){
      return (
        <View style={styles.containerOne}>
          <Text style={styles.text}>🚀User not in ldap</Text>
          <Button
            raised
            fontSize={20}
            icon={{name: 'class'}}
            backgroundColor={'#397af8'}
            borderRadius={8}
            title="Go Back"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a899c',
    justifyContent: 'center',
  },
  containerOne: {
    flex: 1,
    backgroundColor: '#8a899c',
  },
  text: {
    backgroundColor: '#8a899c',
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
})
