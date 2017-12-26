'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, Subtitle, Item, Input } from "native-base";
import firebase from 'react-native-firebase';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient';

class StateScreen extends Component {
  render() {
    return (
      	<Container>

			<Content contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ justifyContent: "center", alignItems: "center", flex: 1, paddingLeft:120, paddingRight:120, paddingTop: 50}}>
					<AnimatedLinearGradient customColors={presetColors.firefox} speed={4000}/>
				</View>
			</Content>

		</Container>
    );
  }
}

const styles = StyleSheet.create({

});


export default StateScreen;