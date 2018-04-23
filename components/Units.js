import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements'

import HamburguerLogo from './HeaderComponents'

import GlRequest from './graphQLUtils';

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

const request = `query{
    allUnits{
      id
      nombre
    }
}`;


export default class UnitResults extends React.Component {
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
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    GlRequest(
      request ,
      (data) => {
        this.setState({
          dataSource: data.allUnits,
          isLoading: false,
        })
      },
      (status, data) => {

      }
    );
  }

  render() {
    console.log("PROPS DE UNITS:")
    console.log(this.state)
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>🚀Wellcome to IbisDiscite, this are the units we offer to you.</Text>
        <Text style={styles.text}>🚀If you want to view examples of an specific unit, tap on the unit you want.</Text>
        <FlatList
          ItemSeparatorComponent={ () => <View style={ { width: 10, height: 10, backgroundColor: 'whitesmoke' } } /> }
          data={this.state.dataSource}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('UnitId', {id: item.id, name: item.nombre})}
            >
              <Text style={styles.item}>{item.id}: {item.nombre}</Text>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
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
