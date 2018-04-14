import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Button, StyleSheet, Text, View } from 'react-native';

class HomeView extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerTintColor: 'blue',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
        <Button
          title="View Examples"
          onPress={() => this.props.navigation.navigate('Examples')}
        />
        <Button
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    backgroundColor: 'whitesmoke',
    color: '#4A90E2',
    fontSize: 24,
    padding: 10,
  },
})

export default HomeView
