'use strict';

import React, { Component } from 'react';

import {
	Dimensions,
	Image,
  	StyleSheet,
  	View,
  	RefreshControl
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, Subtitle, Item, Input, List, ListItem, Thumbnail, Picker } from "native-base";

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
	  	refreshing: false,
	  	uid: this.props.navigation.state.params.uid,
	  	entries: [],
	  };
	}

	  _onRefresh() {
	    this.setState({refreshing: true});
	    console.log("onRefresh");
	    this.loadData();
	    
	  }

	componentDidMount() {
		this.loadData();
	}

	loadData(){
		var that = this;
		var userCollection = [];
		this.setState({entries:[]});

		firebase.database().ref('employees/' + this.state.uid).once('value').then( ( snapshot ) => {
			snapshot.forEach(function(child){
				userCollection.push(child.val());		
			});

			this.setState({entries:userCollection});
			this.setState({refreshing: false});
		});


	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	  if(nextProps.navigation.state.params.refreshScene == true){
	  	var userCollection = [];

		firebase.database().ref('employees/' + this.state.uid).once('value').then( ( snapshot ) => {
			snapshot.forEach(function(child){
				userCollection.push(child.val());		
			});

			this.setState({entries:userCollection});
		});
	  } 
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
				<View style={{flex: 1}}>
					<AnimatedLinearGradient customColors={presetColors.sunrise} speed={4000}/>
					<List dataArray={this.state.entries} refreshControl={
				          <RefreshControl
				            refreshing={this.state.refreshing}
				            onRefresh={this._onRefresh.bind(this)}
				          />
				        } renderRow={data =>
		        	  <ListItem style={{backgroundColor: "transparent", paddingTop: 10, paddingBottom:10}} avatar button onPress={() => { this.props.navigation.navigate("NewEmployee", {employeeData:data, editing: true}) }}>
		        	  	<Thumbnail size={80} source={{'uri': data.picture }} />
		        	  	<Body>
			            	<Text style={styles.employeeName}>{data.name} {data.surname} </Text>
			            	<Text note>{data.location} – {data.duty} </Text>
			            </Body>
			            <Right>
			              <Icon name="arrow-forward" style={{ color: '#FFF'}} />
			            </Right>
			          </ListItem>
			    	}>
					</List>
				</View>
			</Container>
	    );
  	}
}



export default AdminDash;