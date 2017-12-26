'use strict';

import React, { Component } from 'react';

import {
	Image,
  	StyleSheet,
  	View,
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, Subtitle, Item, Input } from "native-base";

import KeyPad from './KeyPad';

import firebase from 'react-native-firebase';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient';

class PinScreen extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  	uid: this.props.navigation.state.params.data.uid,
	  	logo: 'https://firebasestorage.googleapis.com/v0/b/present-f5ca7.appspot.com/o/restaurants%2F-hjki%2Fsopizza.png?alt=media&token=b2e0c120-0afd-43ea-b502-921e17918454',
	  	name: '',
	  	subline: '',
	  };
	}

	componentWillMount() {
		firebase.database().ref('restaurants/' + this.state.uid).once('value').then((res) => {
			this.setState({logo: res.val().logo, name: res.val().name, subline: res.val().street });
		});

		
	}

	onSubmit(pin){
		
	}

	render() {
		return (
			<Container >
				<Content contentContainerStyle={{ flexGrow: 1 }}>
					<View style={{ justifyContent: "center", alignItems: "center", flex: 1, paddingLeft:120, paddingRight:120, paddingTop: 50}}>
						<AnimatedLinearGradient customColors={presetColors.instagram} speed={4000}/>
						<Image style={{width: 400, height: 300, resizeMode: 'contain'}}
							source={{uri: this.state.logo}}
						/>
						<Text style={{textAlign: 'center', marginTop: -40, fontWeight: 'bold'}}>{this.state.name}{'\n'}{this.state.subline}</Text>
						<KeyPad style={{flex: 3}} onSubmit={(pin) => this.onSubmit(pin) }/>
					</View>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({

});


export default PinScreen;