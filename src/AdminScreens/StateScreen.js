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
  constructor(props) {
    super(props);
  
    this.state = {
      timestamp_now: '',
      status: '',
      timer: 1000,
      timePassed: false,
    };
  }

  componentDidMount() {
    let userKey = this.props.navigation.state.params.data.key;
    let timer = this.state.timer;

    console.log("mount employee js");
    
    var newPostKey = firebase.database().ref("times").push().key;

    let updates = {};
    updates['/times/-hjki/'+ userKey +"/"+newPostKey] = firebase.database.ServerValue.TIMESTAMP;

    firebase.database().ref().update(updates).then(()=>{
      console.log("updated");
      this.setState({status: "updated"});

      setTimeout(()=>{
        this.setTimePassed();
      }, timer)

    }).catch(()=>{
      console.log("error")
      this.setState({status: "something went wrong, please contact your supervisor."});
    });
  }

  setTimePassed(){
    this.setState({timePassed:true});
  }


  render() {
    return (
      	<Container>

			<Content contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ justifyContent: "center", alignItems: "center", flex: 1, paddingLeft:120, paddingRight:120, paddingTop: 50}}>
					<AnimatedLinearGradient customColors={presetColors.firefox} speed={4000}/>
          <Text>"{this.props.navigation.state.params.data.name}"</Text>
          <Text>{this.state.status}</Text>
				</View>
			</Content>

		</Container>
    );
  }
}

const styles = StyleSheet.create({

});


export default StateScreen;