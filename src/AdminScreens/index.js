'use strict';

import React, { Component } from "react";
import { TabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
import AdminDash from './AdminDash';
import AdminNewEmployee from './AdminNewEmployee';

const AdminScreenRouter = TabNavigator({
	    AdminDash: { screen: AdminDash },
	    NewEmployee: { screen: AdminNewEmployee }
	  },
	  {
	    tabBarPosition: "bottom",
	    tabBarComponent: props => {
	      return (
	        <Footer>
	          <FooterTab>
	            <Button
	              vertical
	              transparent
	              active={props.navigationState.index === 0}
	              onPress={() => props.navigation.navigate("AdminDash")}>
	              <Icon name="ios-list-box-outline" />
	              <Text>Admin Dashboard</Text>
	            </Button>
	            <Button
	              vertical
	              transparent
	              active={props.navigationState.index === 1}
	              onPress={() => props.navigation.navigate("NewEmployee", {editing: false})}>
	              <Icon name="ios-person-add-outline" />
	              <Text>New Employee</Text>
	            </Button>
	            <Button
	              vertical
	              transparent
	              warning
	              active={props.navigationState.index === 2}
	              onPress={() => props.navigation.navigate("LoginScreen")}>
	              <Icon name="ios-exit-outline" />
	              <Text>EXIT</Text>
	            </Button>
	            <Button
	              vertical
	              transparent
	              success
	              active={props.navigationState.index === 3}
	              onPress={() => props.navigation.navigate("StateScreen")}>
	              <Icon name="ios-timer-outline" />
	              <Text style={{color: "#000"}}>CHECKIN / CHECKOUT</Text>
	            </Button>
	          </FooterTab>
	        </Footer>
	      );
	    }
	  }
);

export default AdminScreenRouter;

