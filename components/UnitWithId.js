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
    allExamples{
      id
      unit_id
      contenido
    }
}`;

export default class UnitWithId extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Units',
    headerTintColor: 'whitesmoke',
    headerStyle: {
      backgroundColor: '#000158'
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
      request ,
      (data) => {
        this.setState({
          dataSource: data.allExamples,
          isLoading: false,
        })
      },
      (status, data) => {

      }
    );
  }

  render() {
    /*console.log("PROPS DE UNIT WITH ID:")
    console.log(this.props)*/
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="whitesmoke"/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style = {styles.text}>🚀You are viewing the unit {this.props.navigation.state.params.id} {this.props.navigation.state.params.name}</Text>
        <Button
          raised
          fontSize={20}
          icon={{name: 'class'}}
          backgroundColor={'#397af8'}
          borderRadius={8}
          title="Examples!!"
          onPress={() => this.props.navigation.navigate('ListEx', {id: this.props.navigation.state.params.id, name: this.props.navigation.state.params.nombre})}
        />
        <Text style={styles.text}></Text>
        <Button
          raised
          fontSize={20}
          icon={{name: 'class'}}
          backgroundColor={'#397af8'}
          borderRadius={8}
          title="Make Exercises!!"
          onPress={() => this.props.navigation.navigate('Exercises', {id: this.props.navigation.state.params.id, exercise: 0})}
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
