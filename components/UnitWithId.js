import React, { Component } from 'react';
import { TouchableHighlight, FlatList, AppRegistry, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements'

import HamburguerLogo from './HeaderComponents'

console.disableWarnings = true;
require("ReactFeatureFlags").warnAboutDeprecatedLifecycles = false;
console.disableYellowBox = true;

export default class UnitWithId extends React.Component {
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
    this.state ={ isLoading: true};
  }

  componentDidMount(){
    return fetch(`http://35.185.3.235:4001/examples/`,
    {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    /*console.log("PROPS DE UNIT WITH ID:")
    console.log(this.props)*/
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style = {styles.text}>🚀You are viewing the unit {this.props.navigation.state.params.id} {this.props.navigation.state.params.name}</Text>
        <FlatList
          ItemSeparatorComponent={ () => <View style={ { width: 10, height: 10, backgroundColor: 'whitesmoke' } } /> }
          data={this.state.dataSource.filter((e) => e.unit_id === this.props.navigation.state.params.id)}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Examples',{id: item.id})}
            >
              <Text style={styles.item}>Ejemplo {item.id}</Text>
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
