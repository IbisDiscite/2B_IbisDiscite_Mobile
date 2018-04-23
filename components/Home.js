import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableHighlight, Image, StyleSheet, Text, View, Header, ActivityIndicator } from 'react-native';
import {Button} from 'react-native-elements';

import HamburguerLogo from './HeaderComponents';
import Login from './Login';

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;


export default class HomeView extends React.Component {
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
    this.state ={ isLoading: true, loged: false}
  }

  componentDidMount(){
    return fetch('http://35.185.3.235:4000/user_token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth: {email: this.props.navigation.state.params.user, password: this.props.navigation.state.params.pass}
        })
      })
      .then((response) => {
        response.json();
        console.log(response.status);
        this.setState({
          status: response.status,
        })
        if(response.status == 201){
          console.log("Usuario valido")
          this.setState({
            loged: true,
          })
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    console.log("PROPS DEL HOME:")
    console.log(this.props)
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator/>
          <Text style={styles.item}>Verificando Usuario...</Text>
        </View>
      )
    }
    if(this.state.loged == false){
      return(
          <Login navigation={this.props.navigation}/>
      )
    }
    if(this.state.status == 404){
      return(
        <View style={styles.container}>
          <Text style={styles.item}>YOU ARE NOT A VALID USER!</Text>
        </View>
      )
    }
    console.log(this.state)
    if(this.state.loged){
      return (
        <View style={styles.container}>

        <Text style={styles.text}>🚀If you wanna see all units from our App, so you can learn what you want, press here</Text>
        <Text style={styles.text}>Succesfully loged in</Text>
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
