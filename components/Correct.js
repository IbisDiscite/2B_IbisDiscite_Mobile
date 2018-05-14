import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Button } from 'react-native-elements';

import GlRequest from './graphQLUtils';

import HamburguerLogo from './HeaderComponents'

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

export default class Correct extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Exercises',
    headerTintColor: 'whitesmoke',
    headerStyle: {
      backgroundColor: '#000158'
    },
  });

  constructor(props){
    super(props);
  }

  render() {
    var exer = this.props.navigation.state.params.exercise + 1;
    return (
      <View style={styles.containerOne}>
        <Text style = {styles.text}>🚀Correct answer!!</Text>
        <Button
          raised
          fontSize={20}
          icon={{name: 'class'}}
          backgroundColor={'#397af8'}
          borderRadius={8}
          title="Continue?"
          onPress={() => this.props.navigation.navigate('Exercises', {id: this.props.navigation.state.params.id, exercise: exer})}
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
  containerOne: {
    flex: 1,
    backgroundColor: '#8a899c',
  },
  text: {
    backgroundColor: '#8a899c',
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
})
