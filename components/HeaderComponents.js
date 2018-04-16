import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text } from 'react-native';
import {Button} from 'react-native-elements'
import { StackNavigator } from 'react-navigation';

export default class HamburguerLogo extends React.Component {
  render() {
    return (
      <Button
        small
        icon={{name: 'reorder'}}
        backgroundColor={'#FF4000'}
        title=" "
      />
    )
  }
}
