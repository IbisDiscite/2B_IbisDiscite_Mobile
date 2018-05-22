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
          opc3
          opc4
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
        console.log("ERROR")
        console.log(status)
        console.log(data)
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
    //console.log(this.state)
    try{
      return (
        <View style={styles.containerOne}>
            <Text style = {styles.text}>🚀Exercises!!</Text>
            <Text style = {styles.text}>🚀On Exercise {this.props.navigation.state.params.exercise} with id {this.state.dataSource[this.props.navigation.state.params.exercise].id}</Text>
            <View style={styles.container}>
              <Text style = {styles.text}>🚀{this.state.dataSource[this.props.navigation.state.params.exercise].enunciado}</Text>
              <Button
                raised
                fontSize={20}
                icon={{name: 'class'}}
                backgroundColor={'#397af8'}
                borderRadius={8}
                title= {this.state.dataSource[this.props.navigation.state.params.exercise].opc1}
                onPress={() => this._onPressButton(this.state.dataSource[this.props.navigation.state.params.exercise].opc1, this.state.dataSource[this.props.navigation.state.params.exercise].respuesta)}
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
              <Text style={styles.text}></Text>
              <Button
                raised
                fontSize={20}
                icon={{name: 'class'}}
                backgroundColor={'#397af8'}
                borderRadius={8}
                title= {this.state.dataSource[this.props.navigation.state.params.exercise].opc3}
                onPress={() => this._onPressButton(this.state.dataSource[this.props.navigation.state.params.exercise].opc3, this.state.dataSource[this.props.navigation.state.params.exercise].respuesta)}
              />
              <Text style={styles.text}></Text>
              <Button
                raised
                fontSize={20}
                icon={{name: 'class'}}
                backgroundColor={'#397af8'}
                borderRadius={8}
                title= {this.state.dataSource[this.props.navigation.state.params.exercise].opc4}
                onPress={() => this._onPressButton(this.state.dataSource[this.props.navigation.state.params.exercise].opc4, this.state.dataSource[this.props.navigation.state.params.exercise].respuesta)}
              />
            </View>
        </View>
      )
    } catch(err) {
      return (
        <View style={styles.containerOne}>
            <Text style = {styles.text}>🚀You Correctly Finnished All This Unit Exercises!!!😱</Text>
            <Text style = {styles.text}>🚀Wanna Go Back To Units?</Text>
            <Button
              raised
              fontSize={20}
              icon={{name: 'class'}}
              backgroundColor={'#397af8'}
              borderRadius={8}
              title="Units"
              onPress={() => this.props.navigation.navigate('Units')}
            />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeaeae',
    justifyContent: 'center',
  },
  containerOne: {
    flex: 1,
    backgroundColor: '#aeaeae',
  },
  text: {
    backgroundColor: '#aeaeae',
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
