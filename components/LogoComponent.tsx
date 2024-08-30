import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { colors } from 'utils/colors';

export class LogoComponent extends Component {
  render() {
    return <Image source={require('assets/logo.png')} style={styles.logo} />;
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 500,
    height: 500,
  },
});

export default LogoComponent;
