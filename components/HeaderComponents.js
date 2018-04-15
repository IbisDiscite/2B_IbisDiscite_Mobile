import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text } from 'react-native';
import {Button} from 'react-native-elements'

class HamburguerLogo extends React.Component {
  render() {
    return (
      <Button
        small
        icon={{name: 'home'}}
        backgroundColor={'#FF4000'}
        title=" "
      />
    )
  }
}

export default HamburguerLogo;
