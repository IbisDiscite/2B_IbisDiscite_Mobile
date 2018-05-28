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
    this.state ={ isLoading: true, isLoadingL: true, loged: false, error: false, answer: "true"}
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
    var request = `mutation{
      createSession(session:{
        email: "${this.props.navigation.state.params.user}"
        password: "${this.props.navigation.state.params.pass}"
      }) {
        id
        email
        token
        client
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

    var validate = `query{
      validateToken(headers:{
        client: "${this.props.navigation.state.params.client}",
        token: "${this.props.navigation.state.params.token}",
        uid: "${this.props.navigation.state.params.uid}"
      }){
        id
        email
        type
        email
        nickname
      }
    }`
    console.log("------------------------------------------------")
    console.log("DASDASD",this.props.navigation.state.params.client)
    console.log("DASDASD",this.props.navigation.state.params.token)
    console.log("DASDASD",this.props.navigation.state.params.uid)
    console.log("------------------------------------------------")
    if(this.props.navigation.state.params.client == null && this.props.navigation.state.params.token == null && this.props.navigation.state.params.uid == null){
      GlRequest(
        request ,
        (data) => {
          this.setState({
            dataSource: data.createSession,
            isLoading: false,
          })
          GlRequest(
            requestLdap ,
            (data) => {
              this.setState({
                dataSourceL: data.auth,
                isLoadingL: false,
                loged: true,
              })
            },
            (error) => {
            }
          );
          AsyncStorage.setItem("token", `${this.state.dataSource.token}`);
          AsyncStorage.setItem("client", `${this.state.dataSource.client}`);
          AsyncStorage.setItem("uid", `${this.state.dataSource.email}`);
        },
        (error) => {
          //console.log(error)
          this.setState({
            error: true,
            isLoading: false
          })
        }
      );
    }
    GlRequest(
      validate ,
      (data) => {
        this.setState({
          isLoading: false,
          loged: true,
        })
      },
      (error) => {
        //console.log(error)
        this.setState({
          error: true,
          isLoading: false
        })
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
    if(this.state.loged){
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
