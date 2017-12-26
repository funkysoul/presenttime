/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import LoginScreen from './src/LoginScreen/index.js';

export default class PresentTime extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  

  render(){
    return <LoginScreen />;
  }
}