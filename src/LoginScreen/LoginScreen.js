'use strict';

import React, { Component } from 'react';
import {
	AsyncStorage,
	Image,
  	StyleSheet,
  	View,
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, Subtitle, Item, Input } from "native-base";

import PinScreen from '../PINScreen/index.js';
import firebase from 'react-native-firebase';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient';

export default class LoginScreen extends React.Component {
	constructor(props) {
	  	super(props);
	
		this.unsubscriber = null;
		this.state = {
			user: null,
			username: 'tech@thekitchen.agency',
			password: 'nokia7110'
		};
	}

	componentWillMount() {
		AsyncStorage.getItem('userData').then((user_data_json) => {
			let userData = JSON.parse(user_data_json);
			if(userData !== null){
				console.log(userData);
				this.props.navigation.navigate("PinScreen", {data:userData});
			} else {

			}
			
		})
	}

	login(){
		firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then((res) => {
			console.log(res);
			AsyncStorage.setItem('userData', JSON.stringify(res));
			this.props.navigation.navigate("PinScreen", {data:res});
		});
	}

	resetPassword(){
		firebase.auth().sendPasswordResetEmail('tech@thekitchen.agency');
	}

	render() {
		return (
			<Container >
				{/*<Header hasSubtitle style={{width: '100%'}}>
					<Left />
					<Body>
						<Title>Present</Title>
						<Subtitle>Login</Subtitle>
					</Body>
					<Right>
						<Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
							<Icon ios='ios-information-circle-outline' android="md-menu" style={{fontSize: 25, paddingTop: 6}}/>
						</Button>
					</Right>
				</Header>*/}
				<Content contentContainerStyle={{ flexGrow: 1 }}>
					<View style={{ justifyContent: "center", alignItems: "center", flex: 1, paddingLeft:120, paddingRight:120}}>
						<AnimatedLinearGradient customColors={presetColors.instagram} speed={4000}/>
						<Image style={{marginBottom: 100}}
						source={require('../assets/images/present_icon.png')}
						/>
						<Item regular>
							<Input placeholder='Benutzername / E-Mail' value="tech@thekitchen.agency"/>
						</Item>
						<Item regular>
							<Input placeholder='Passwort' value="nokia7110" secureTextEntry/>
						</Item>
						<Button block light rounded style={{marginTop: 50}} onPress={() => this.login() }>
							<Text>Einloggen</Text>
						</Button>
						<Button transparent style={{ alignSelf: "center" }}>
							<Text style={{fontSize: 14}}>Passwort vergessen?</Text>
						</Button>
					</View>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({

});


