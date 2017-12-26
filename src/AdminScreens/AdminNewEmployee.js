'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, Subtitle, Item, Input, Thumbnail, Form, Label } from "native-base";
import firebase from 'react-native-firebase';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient';

class AdminDash extends Component {
  render() {
    return (
      	<Container >
			<Content contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{paddingLeft:120, paddingRight:120, paddingTop: 50}}>
					<AnimatedLinearGradient customColors={presetColors.sunrise} speed={4000}/>
          <Thumbnail large source={{uri: 'https://firebasestorage.googleapis.com/v0/b/present-f5ca7.appspot.com/o/restaurants%2F-hjki%2Femployees%2F83.jpg?alt=media&token=6ac1a7c1-006e-4d26-a9bb-0559cd7a864d'}} />
          <Text>NEW EMPLOYEE 1</Text>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item>
              <Input placeholder='Rounded Textbox'/>
            </Item>
          </Form>
				</View>
			</Content>
		</Container>
    );
  }
}

const styles = StyleSheet.create({

});


export default AdminDash;