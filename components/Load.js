import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements'

import HamburguerLogo from './HeaderComponents'

import GlRequest from './graphQLUtils';

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

export default class Load extends React.Component {
  constructor(props){
    super(props);
    this.state ={ loaded: false};
  }

  render() {
      return(
        <View style={styles.container}>
          <Image
            source={require('../images/ibis.png')}
            style={{width: 50, height: 50, color: 'black'}}
            onLoad={this.setState({loaded: true})}
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
