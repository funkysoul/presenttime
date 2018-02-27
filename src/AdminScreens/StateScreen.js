'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, Subtitle, Item, Input } from "native-base";
import firebase from 'react-native-firebase';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient';

import Animation from 'lottie-react-native';

class StateScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      timestamp_now: '',
      status: '',
      timer: 2000,
      timePassed: false,
    };
  }

  componentDidMount() {
    let userKey = this.props.navigation.state.params.data.key;
    let companyKey = this.props.navigation.state.params;
    let timer = this.state.timer;

    console.log("mount employee js");
    console.log(this.props.navigation.state.params);
    
    var newPostKey = firebase.database().ref("times").push().key;

    let updates = {};
    updates['/times/-hjki/'+ userKey +"/"+newPostKey] = firebase.database.ServerValue.TIMESTAMP;

    firebase.database().ref().update(updates).then(()=>{
      console.log("updated");
      this.setState({status: "updated"});
      this.animation.play()

      setTimeout(()=>{
        this.setTimePassed(companyKey);
      }, timer)

    }).catch(()=>{
      console.log("error")
      this.setState({status: "something went wrong, please contact your supervisor."});
    });
  }

  setTimePassed(companyKey){
    this.setState({timePassed:true});
    this.props.navigation.navigate("PinScreen", {data:companyKey});
  }


  render() {
    return (
        

          <Content contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, paddingTop: 50, alignContent: "center"}}>
              <AnimatedLinearGradient customColors={presetColors.firefox} speed={4000}/>
              {/*<Text>"{this.props.navigation.state.params.data.name}"</Text>
              <Text>{this.state.status}</Text>*/}
              <Animation
                loop={false}
                ref={ref => this.animation = ref}
                style={{width:'100%', height: 200}}
                source={require('../assets/data/lottie_check.json')}/>
            </View>
          </Content>


    );
  }
}

const styles = StyleSheet.create({

});


export default StateScreen;