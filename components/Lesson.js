import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Button } from 'react-native-elements'

import HamburguerLogo from './HeaderComponents'

import GlRequest from './graphQLUtils';

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

export default class LessonsView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Lesson',
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
        allTodayslessons{
          name
          unit_id
          description
        }
      }`,
      (data) => {
        this.setState({
          dataSource: data.allTodayslessons,
          isLoading: false,
        })
      },
      (status, data) => {

      }
    );
  }

  render() {
    //console.log("LESSONS")
    //console.log(this.state)
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }
    if(this.state.isLoading == false){
        var rand = Math.floor(Math.random()*this.state.dataSource.length)
    }
    return (
      <View style={styles.container}>
        <Text></Text>
        <Text style={styles.text}>Here is a random lesson!</Text>
        <Text></Text>
        <Text style={styles.text}>{this.state.dataSource[rand].name}:</Text>
        <Text></Text>
        <Text style={styles.text}>{this.state.dataSource[rand].description}</Text>
        <Text></Text>
        <Button
          raised
          fontSize={20}
          icon={{name: 'class'}}
          backgroundColor={'#00283F'}
          borderRadius={8}
          title="View Units"
          onPress={() => this.props.navigation.navigate('Units')}
        />
      </View>
    );
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
    left: 10,
  },
})
