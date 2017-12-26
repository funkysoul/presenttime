'use strict';

import React, { Component } from 'react';
import LoginScreen from './LoginScreen.js';
import PINScreen from '../PINScreen/index.js';
/*import ChecksScreen from './ChecksScreen/index.js';*/
import { StackNavigator } from "react-navigation";

const LoginScreenRouter = StackNavigator({
	LoginScreen: {screen: LoginScreen },
	PinScreen: {screen: PINScreen }
	/*ChecksScreen: {screen: ChecksScreen }*/
	},{
		headerMode: 'none'
	}

);

export default LoginScreenRouter;
