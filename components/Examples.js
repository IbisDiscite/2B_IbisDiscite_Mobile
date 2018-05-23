import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements'

import HamburguerLogo from './HeaderComponents'

import GlRequest from './graphQLUtils';

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

export default class ExamplesView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Examples',
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
    var request = `query{
      exampleById(id:${this.props.navigation.state.params.id}){
        id
        contenido
      }
    }`;

    GlRequest(
      request ,
      (data) => {
        this.setState({
          dataSource: data.exampleById,
          isLoading: false,
        })
      },
      (status, data) => {

      }
    );
  }

  render() {
    /*console.log("PROPS DE EXAMPLES:")
    console.log(this.props)*/
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00283F"/>
          <Text> </Text>
          <Text style={styles.verification}>Loading Example...</Text>
        </View>
      )
    }
    return (
      <View style={styles.containerOne}>
        <Text style={styles.title}>Example {this.props.navigation.state.params.id}:</Text>
        <View style={styles.containerOne}>
          <Text style={styles.text}>{this.state.dataSource.contenido}</Text>
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
    borderColor: '#397af8',
  },
  containerOne: {
    flex: 1,
    backgroundColor: '#aeaeae',
  },
  title: {
    backgroundColor: '#aeaeae',
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
    padding: 10,
  },
  text: {
    backgroundColor: '#aeaeae',
    color: 'black',
    fontSize: 25,
    fontStyle: 'italic',
    padding: 10,
  },
})
