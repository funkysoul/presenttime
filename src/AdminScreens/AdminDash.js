'use strict';

import React, { Component } from 'react';

import {
	Dimensions,
	Image,
  	StyleSheet,
  	View,
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, Subtitle, Item, Input, List, ListItem, Thumbnail } from "native-base";

import firebase from 'react-native-firebase';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient';


const styles = StyleSheet.create({
	employeeName: {
		fontSize: 20,
		color: "#FFF"
	}
});


class AdminDash extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	uid: this.props.navigation.state.params.uid,
	  	entries: [],
	  };

	  console.log(this.props);
	}

	componentDidMount() {
		var that = this;
		var userCollection = [];

		firebase.database().ref('employees/' + this.state.uid).once('value').then( ( snapshot ) => {
			snapshot.forEach(function(child){
				userCollection.push(child.val());		
			});

			this.setState({entries:userCollection});

			console.log(that.state.entries);
		});
	}



  	render() {
	    return (
	      	<Container >
	      		<Header hasSubtitle style={{backgroundColor: 'transparent'}}>
					<Left />
					<Body>
						<Title>Dashboard</Title>
					</Body>
					<Right>
						<Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
							<Icon ios='ios-list-outline' android="md-list" style={{fontSize: 40, paddingTop: 7}}/>
						</Button>
						<Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
							<Icon ios='ios-apps-outline' android="md-apps" style={{fontSize: 28, paddingTop: 6}}/>
						</Button>
					</Right>
				</Header>
				<Content contentContainerStyle={{ flexGrow: 1 }}>
					<AnimatedLinearGradient customColors={presetColors.sunrise} speed={4000}/>
					<List dataArray={this.state.entries} renderRow={data =>
		        	  <ListItem style={{backgroundColor: "transparent", paddingTop: 10, paddingBottom:10}}  avatar button onPress={(data) => { this.props.navigation.navigate("NewEmployee", {employeeData:data}) }}>
		        	  	<Thumbnail size={80} source={{'uri': data.picture }} />
		        	  	<Body>
			            	<Text style={styles.employeeName}>{data.name} {data.surname} </Text>
			            	<Text note>{data.name} {data.surname} </Text>
			            </Body>
			            <Right>
			              <Icon name="arrow-forward" style={{ color: '#FFF'}} />
			            </Right>
			          </ListItem>
			    	}>
					</List>
				</Content>
			</Container>
	    );
  	}
}



export default AdminDash;