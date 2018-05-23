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
        <View style={styles.containerOne}>
          <ActivityIndicator size="large" color="#00283F"/>
          <Text style={styles.verification}>Loading {this.props.navigation.state.params.name}</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text> </Text>
        <Text> </Text>
        <Text style = {styles.action}>{this.props.navigation.state.params.name}!</Text>
        <View style={styles.containerOne}>
          <Button
            raised
            fontSize={20}
            icon={{name: 'class'}}
            backgroundColor={'#00283F'}
            borderRadius={8}
            title="Examples!!"
            onPress={() => this.props.navigation.navigate('ListEx', {id: this.props.navigation.state.params.id, name: this.props.navigation.state.params.nombre})}
          />
          <Text style={styles.text}></Text>
          <Button
            raised
            fontSize={20}
            icon={{name: 'class'}}
            backgroundColor={'#00283F'}
            borderRadius={8}
            title="Exercises!!"
            onPress={() => this.props.navigation.navigate('Exercises', {id: this.props.navigation.state.params.id, exercise: 0})}
          />
        </View>
      </View>
    )
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
    fontSize: 30,
    borderColor: 'black',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  }
})
