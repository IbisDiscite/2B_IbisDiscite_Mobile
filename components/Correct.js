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
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#565656'
    },
  });

  constructor(props){
    super(props);
  }

  render() {
    var exer = this.props.navigation.state.params.exercise + 1;
    return (
      <View style={styles.container}>
        <Text style = {styles.text}>Correct answer!!</Text>
        <View style={styles.container}>
          <Button
            raised
            fontSize={20}
            icon={{name: 'forward'}}
            backgroundColor={'#00283F'}
            borderRadius={8}
            title="Continue?"
            onPress={() => this.props.navigation.navigate('Exercises', {id: this.props.navigation.state.params.id, exercise: exer})}
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
    justifyContent: 'center',
  },
  text: {
    backgroundColor: '#aeaeae',
    textAlign: 'center',
    color: '#00283F',
    fontSize: 30,
    padding: 10,
    fontWeight: 'bold',
  },
})
