import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router-native';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';

class ExamplesView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Examples</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: 'whitesmoke',
    color: '#4A90E2',
    fontSize: 24,
    padding: 10,
  },
})

export default ExamplesView
