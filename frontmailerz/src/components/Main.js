import React, { Component } from "react";
import { Switch } from "react-router-dom";
import firebase from "firebase";

import Login from "./authentication/Login";
import Index from "./Tabs/Index";

export class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
		this.authenticate = this.authenticate.bind(this);
	}

	componentDidMount() {
		this.authenticate();
	}

	authenticate() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ user });
			} else {
				this.setState({ user: null });
			}
		});
	}

	render() {
		return <Switch>{this.state.user ? <Index /> : <Login />}</Switch>;
	}
}

export default Main;
