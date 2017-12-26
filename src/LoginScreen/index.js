'use strict';

import React, { Component } from 'react';
import LoginScreen from './LoginScreen.js';
import PINScreen from '../PINScreen/index.js';
import AdminDash from '../AdminScreens/index.js';
import StateScreen from '../AdminScreens/StateScreen';
import { StackNavigator } from "react-navigation";

const LoginScreenRouter = StackNavigator({
	LoginScreen: {screen: LoginScreen },
	PinScreen: {screen: PINScreen },
	AdminDash: {screen: AdminDash },
	StateScreen: {screen: StateScreen }
	},{
		headerMode: 'none'
	}

);

export default LoginScreenRouter;
