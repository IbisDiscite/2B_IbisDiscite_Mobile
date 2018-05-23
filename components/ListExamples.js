import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';

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

export default class ListExamples extends React.Component {
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
          <ActivityIndicator size="large" color="#00283F"/>
          <Text> </Text>
          <Text style={styles.verification}>Loading Examples...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text> </Text>
        <FlatList
          ItemSeparatorComponent={ () => <View style={ { width: 10, height: 10, backgroundColor: '#aeaeae' } } /> }
          data={this.state.dataSource.filter((e) => e.unit_id === this.props.navigation.state.params.id)}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Examples',{id: item.id})}
            >
              <Text style={styles.item}>Example {item.id}</Text>
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
    backgroundColor: '#aeaeae',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: '#aeaeae',
    color: 'black',
    fontSize: 15,
    padding: 10,
  },
  verification: {
    backgroundColor: '#aeaeae',
    textAlign: 'center',
    fontSize: 25,
    padding: 10,
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
})
