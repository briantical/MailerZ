import React, { Component } from "react";
import FireConfig from "../firebase/FirebaseConfig";
import TextField from "@material-ui/core/TextField";
import "./auth.css";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.signin = this.signin.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.signin(this.state.email, this.state.password);
	}

	signin(email, password) {
		FireConfig.auth()
			.signInWithEmailAndPassword(email, password)
			.then(console.log("user successfully signed in"))
			.catch(error => {
				var errorMessage = error.message;
				console.log("Error : " + errorMessage);
			});
	}

	render() {
		return (
			<div className="loginBody">
				<form>
					<table>
						<tbody>
							<tr>
								<td>
									<TextField
										required
										id="standard-required"
										label="Email"
										margin="normal"
										onChange={this.handleChange}
									/>
								</td>
							</tr>
							<tr>
								<td>
									<TextField
										required
										id="standard-password-input"
										label="Password"
										type="password"
										margin="normal"
										onChange={this.handleChange}
									/>
								</td>
							</tr>
							<tr>
								<td cols="2">
									<input
										type="submit"
										value="Submit"
										onClick={this.handleSubmit}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		);
	}
}
