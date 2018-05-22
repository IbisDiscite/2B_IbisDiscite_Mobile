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
    //console.log("PROPS DE UNITS:")
    //console.log(this.state)
    if(this.state.isLoading){
      return (
        <View style={styles.containerOne}>
          <ActivityIndicator size="large" color="#00283F"/>
          <Text> </Text>
          <Text style={styles.log}>Loading Units...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We ofer you these units...</Text>
        <Text style={styles.text}>Scroll down</Text>
        <FlatList
          ItemSeparatorComponent={ () => <View style={ { width: 10, height: 10, backgroundColor: '#aeaeae' } } /> }
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
        <Text> </Text>
        <Text> </Text>
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
    textAlign: 'auto',
  },
  item: {
    textAlign: 'left',
    left: 8,
    right: 15,
    borderRadius: 5,
    backgroundColor: '#00283F',
    color: 'whitesmoke',
    fontSize: 20,
    padding: 10,
  },
  log: {
    backgroundColor: '#aeaeae',
    color: 'black',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  }
})
