import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
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
      Alert.alert(
        'Answer',
        'Correct!',
      )
      this.props.navigation.navigate('Exercises', {id: this.props.navigation.state.params.id, exercise: this.props.navigation.state.params.exercise + 1})
    } else {
      Alert.alert(
        'Answer',
        'Incorrect!',
      )
    }
  }

  render() {
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00283F"/>
          <Text> </Text>
          <Text style={styles.verification}>Loading Exercises...</Text>
        </View>
      )
    }
    //console.log(datos)
    //console.log("PROPS EXERCISES")
    //console.log(this.state)
    try{
      return (
        <View style={styles.containerOne}>
            <Text style = {styles.title}>Exercise {this.props.navigation.state.params.exercise + 1} {this.state.dataSource.id}</Text>
            <Text> </Text>
            <Text style = {styles.enunciado}>{this.state.dataSource[this.props.navigation.state.params.exercise].enunciado}:</Text>
            <View style={styles.container}>
              <Button
                raised
                fontSize={20}
                icon={{name: 'done'}}
                backgroundColor={'#00283F'}
                borderRadius={8}
                title= {this.state.dataSource[this.props.navigation.state.params.exercise].opc1}
                onPress={() => this._onPressButton(this.state.dataSource[this.props.navigation.state.params.exercise].opc1, this.state.dataSource[this.props.navigation.state.params.exercise].respuesta)}
              />
              <Text style={styles.text}></Text>
              <Button
                raised
                fontSize={20}
                icon={{name: 'done'}}
                backgroundColor={'#00283F'}
                borderRadius={8}
                title= {this.state.dataSource[this.props.navigation.state.params.exercise].opc2}
                onPress={() => this._onPressButton(this.state.dataSource[this.props.navigation.state.params.exercise].opc2, this.state.dataSource[this.props.navigation.state.params.exercise].respuesta)}
              />
              <Text style={styles.text}></Text>
              <Button
                raised
                fontSize={20}
                icon={{name: 'done'}}
                backgroundColor={'#00283F'}
                borderRadius={8}
                title= {this.state.dataSource[this.props.navigation.state.params.exercise].opc3}
                onPress={() => this._onPressButton(this.state.dataSource[this.props.navigation.state.params.exercise].opc3, this.state.dataSource[this.props.navigation.state.params.exercise].respuesta)}
              />
              <Text style={styles.text}></Text>
              <Button
                raised
                fontSize={20}
                icon={{name: 'done'}}
                backgroundColor={'#00283F'}
                borderRadius={8}
                title= {this.state.dataSource[this.props.navigation.state.params.exercise].opc4}
                onPress={() => this._onPressButton(this.state.dataSource[this.props.navigation.state.params.exercise].opc4, this.state.dataSource[this.props.navigation.state.params.exercise].respuesta)}
              />
            </View>
        </View>
      )
    } catch(err) {
      return (
        <View style={styles.container}>
            <Text style = {styles.text}>You Correctly Finnished All This Unit Exercises!!!</Text>
            <Text style = {styles.text}>Wanna Go Back To Units?</Text>
            <View style={styles.containerOne}>
              <Button
                raised
                fontSize={20}
                icon={{name: 'class'}}
                backgroundColor={'#00283F'}
                borderRadius={8}
                title="Units"
                onPress={() => this.props.navigation.navigate('Units')}
              />
            </View>
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
    borderColor: '#397af8',
    borderWidth: 0.5,
    borderColor: '#00283F',
  },
  verification: {
    backgroundColor: '#aeaeae',
    textAlign: 'center',
    fontSize: 25,
    padding: 10,
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
  enunciado: {
    backgroundColor: '#aeaeae',
    color: 'black',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
  },
  title: {
    backgroundColor: '#aeaeae',
    color: '#00283F',
    fontSize: 28,
    padding: 10,
    fontWeight: 'bold',
  },
})
