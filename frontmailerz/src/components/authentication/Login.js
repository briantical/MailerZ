import React, { Component } from "react";
import FireConfig from "../FirebaseConfig/FireConfig";
import './auth.css'

class Login extends Component {
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
			<div className="login_container">
				<div className="mailersBackgroundImage">
				</div>
				<div className="theFormContainer">
				<form>
					<table width="400px">
						<tbody>
							<tr>
								<td>Email: </td>
								<td>
									<input
										name="email"
										type="text"
										value={this.state.email}
										onChange={this.handleChange}
									/>
								</td>
							</tr>
							<tr>
								<td>Password:</td>
								<td>
									<input
										name="password"
										type="password"
										value={this.state.password}
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
			</div>
		);
	}
}
export default Login;
