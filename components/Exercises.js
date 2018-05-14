import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Button } from 'react-native-elements';

import GlRequest from './graphQLUtils';

import HamburguerLogo from './HeaderComponents'

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

export default class Exercises extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Exercises',
    headerTintColor: 'whitesmoke',
    headerStyle: {
      backgroundColor: '#000158'
    },
  });

  constructor(props){
    super(props);
    this.state ={ isLoading: true};
  }

  componentDidMount(){
    GlRequest(
      `query{
        exerciseByLeccion(leccion: ${this.props.navigation.state.params.id}){
          id
          enunciado
          leccion
          opc1
          opc2
          respuesta
        }
      }` ,
      (data) => {
        this.setState({
          dataSource: data.exerciseByLeccion,
          isLoading: false,
        })
      },
      (status, data) => {

      }
    );
  }

  _onPressButton(option, answer) {
    /*console.log("ME PRESIONASTE OME")
    console.log(option)
    console.log(answer)*/
    if(option == answer){
      //console.log("Correcto")
      this.props.navigation.navigate('Correct', {id: this.props.navigation.state.params.id, exercise: this.props.navigation.state.params.exercise})
    } else {
      this.props.navigation.navigate('Incorrect', {id: this.state.dataSource.id})
    }
  }

  render() {
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="whitesmoke"/>
        </View>
      )
    }
    //console.log(datos)
    //console.log("PROPS EXERCISES")
    //console.log(this.props)
    return (
      <View style={styles.containerOne}>
        <Text style = {styles.text}>🚀Exercises!!</Text>
        <View style={styles.container}>
          <Text style = {styles.text}>🚀{this.state.dataSource[this.props.navigation.state.params.exercise].enunciado}</Text>
          <Button
            raised
            fontSize={20}
            icon={{name: 'class'}}
            backgroundColor={'#397af8'}
            borderRadius={8}
            title= {this.state.dataSource[this.props.navigation.state.params.exercise].opc1}
            onPress={() => this._onPressButton(this.state.dataSource[this.props.navigation.state.params.exercise].respuesta, this.state.dataSource[this.props.navigation.state.params.exercise].respuesta)}
          />
          <Text style={styles.text}></Text>
          <Button
            raised
            fontSize={20}
            icon={{name: 'class'}}
            backgroundColor={'#397af8'}
            borderRadius={8}
            title= {this.state.dataSource[this.props.navigation.state.params.exercise].opc2}
            onPress={() => this._onPressButton(this.state.dataSource[this.props.navigation.state.params.exercise].opc2, this.state.dataSource[this.props.navigation.state.params.exercise].respuesta)}
          />
        </View>
      </View>
    )
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
  hitext: {
    backgroundColor: 'whitesmoke',
    color: '#64FE2E',
  },
  text: {
    backgroundColor: '#8a899c',
    color: 'black',
    fontSize: 20,
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
  enunciado: {
    backgroundColor: '#8a899c',
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
  log: {
    textAlign: 'center',
    left: 8,
    right: 15,
    borderRadius: 5,
    backgroundColor: '#397af8',
    color: 'whitesmoke',
    fontSize: 20,
    padding: 10,
  }
})