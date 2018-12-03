import React, { Component } from "react";
import firebase from "firebase";

export class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.createUser = this.createUser.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.createUser(this.state.email, this.state.password);
	}
	createUser(email, password) {
		firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.then("user successfully created")
			.catch(error => {
				// Handle Errors here.
				//var errorCode = error.code;
				var errorMessage = error.message;
				console.log("Error : " + errorMessage);
			});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Email:
						<input
							name="email"
							type="text"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</label>
					<br />
					<label>
						Password:
						<input
							name="password"
							type="text"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</label>
					<br />
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}
export default Signup;
