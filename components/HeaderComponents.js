import React, { Component } from 'react';
import { TouchableHighlight, Button, Image, View, Text } from 'react-native';

class HamburguerLogo extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.onPress}>
        <Image
          source={require('../images/menu.png')}
          style={
            { width: 30, height: 30 , right: 5}}
            />
      </TouchableHighlight>
    )
  }
}

export default HamburguerLogo;
