import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableHighlight, Image, StyleSheet, Text, View, Header, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
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
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#565656'
    },
    /*headerRight:
      <HamburguerLogo />,*/
  });
  constructor(props){
    super(props);
    this.state ={ isLoading: true, isLoadingL: true, loged: false, error: false, answer: false}
    Alert.alert(
      'Welcome',
      'We are glad you are with us!',
      [
        {text: 'Begin'},
      ]
    )
  }

  componentDidMount(){
    var usr = `${this.props.navigation.state.params.user}`.replace("@unal.edu.co","");
    //console.log(usr);
    AsyncStorage.getItem("@user").then((value) => {
            var usr = value
            console.log("a ver alv")
            console.log(value)
    }).done();
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
        AsyncStorage.setItem("@loged", `${this.state.dataSource.email}`);
        AsyncStorage.setItem("@session", `${this.props.navigation.state.params.pass}`);
      },
      (error) => {
        //console.log(error)
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
        <View style={styles.containerOne}>
          <ActivityIndicator size="large" color="#00283F"/>
          <Text> </Text>
          <Text style={styles.verification}>Verifying User...</Text>
        </View>
      )
    }
    if(this.state.error){
      return (
        <View style={styles.containerOne}>
          <Text style={styles.verification}>Incorrect Email or Password</Text>
          <Button
            raised
            fontSize={20}
            icon={{name: 'done'}}
            backgroundColor={'#00283F'}
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
        <View style={styles.container}>
          <Text ></Text>
          <Text></Text>
          <Text></Text>
          <Text style={styles.action}> What would you like to do?</Text>
          <View style={styles.containerOne}>
            <Button
              raised
              fontSize={20}
              icon={{name: 'class'}}
              backgroundColor={'#00283F'}
              borderRadius={8}
              title="View Units"
              onPress={() => this.props.navigation.navigate('Units')}
            />
            <Text></Text>
            <Button
              raised
              fontSize={20}
              icon={{name: 'class'}}
              backgroundColor={'#00283F'}
              borderRadius={8}
              title="View A Random Lesson"
              onPress={() => this.props.navigation.navigate('Lesson')}
            />
          </View>
        </View>
      );
    }
    if(this.state.loged && (this.state.dataSourceL.answer == "false")){
      return (
        <View style={styles.container}>
          <Text ></Text>
          <Text style={styles.text}>This user is not registered on the ldap!</Text>
          <View style={styles.containerOne}>
            <Button
              raised
              fontSize={20}
              icon={{name: 'done'}}
              backgroundColor={'#00283F'}
              borderRadius={8}
              title="Go Back"
              onPress={() => this.props.navigation.navigate('Login')}
            />
          </View>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeaeae',
  },
  containerOne: {
    flex: 1,
    backgroundColor: '#aeaeae',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: '#aeaeae',
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
  verification: {
    backgroundColor: '#aeaeae',
    textAlign: 'center',
    fontSize: 25,
    padding: 10,
  },
  action: {
    color: '#0b2b3e',
    fontSize: 25,
    borderColor: 'black',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  }
})
