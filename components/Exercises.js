import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Button } from 'react-native-elements';

import GlRequest from './graphQLUtils';

import HamburguerLogo from './HeaderComponents'

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

const request = `query{
  allExercises{
    enunciado
    leccion
    opc1
    opc2
    respuesta
  }
}`;

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
      request ,
      (data) => {
        this.setState({
          dataSource: data.allExercises,
          isLoading: false,
        })
      },
      (status, data) => {

      }
    );
  }

  _onPressButton(option, answer) {
    console.log("ME PRESIONASTE OME")
    console.log(option)
    console.log(answer)
    if(option == answer){
      console.log("Correcto")
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
    const datos = this.state.dataSource.filter((e) => e.leccion === this.props.navigation.state.params.id)
    //console.log(datos)
    console.log("PROPS EXERCISES")
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Text style = {styles.text}>🚀Exercises!!</Text>
        <Text style = {styles.text}>🚀{datos[this.props.navigation.state.params.exercise].enunciado}</Text>
        <Button
          raised
          fontSize={20}
          icon={{name: 'class'}}
          backgroundColor={'#397af8'}
          borderRadius={8}
          title= {datos[this.props.navigation.state.params.exercise].opc1}
          onPress={() => this._onPressButton(datos[this.props.navigation.state.params.exercise].respuesta, datos[this.props.navigation.state.params.exercise].respuesta)}
        />
        <Button
          raised
          fontSize={20}
          icon={{name: 'class'}}
          backgroundColor={'#397af8'}
          borderRadius={8}
          title= {datos[this.props.navigation.state.params.exercise].opc2}
          onPress={() => this._onPressButton(datos[this.props.navigation.state.params.exercise].opc2, datos[this.props.navigation.state.params.exercise].respuesta)}
        />
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
  hitext: {
    backgroundColor: 'whitesmoke',
    color: '#64FE2E',
  },
  text: {
    backgroundColor: '#8a899c',
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
