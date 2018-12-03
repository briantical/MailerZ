import React, { Component } from "react";
import firebase from "firebase";
import "./auth.css";
import {Warning} from "@material-ui/icons";
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errorMessage: "",
			toastVisible: false
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
		firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.then(console.log("user successfully signed in"))
			.catch(error => {				
				this.setState({errorMessage: error.message, toastVisible: true})
				console.log("Error : " + error.message);
			});
	}

	render() {
		const {toastVisible } = this.state
		return (
			<div className="login_container">
				<div className="mailersBackgroundImage" />
				<div className="theFormContainer">
					<form autoComplete="off">
						<table>
							<tbody>
								<tr>
									<td className="positionAlign">Email: </td>
									<td className="positionAlign">
										<input
											name="email"
											type="text"
											value={this.state.email}
											onChange={this.handleChange}
											required
											maxLength="25"											
										/>
									</td>
								</tr>
								<tr>
									<td className="positionAlign">Password:</td>
									<td className="positionAlign">
										<input
											name="password"
											type="password"
											value={this.state.password}
											onChange={this.handleChange}
											required
											maxLength="15"										
										/>
									</td>
								</tr>
								<tr>
									<td colSpan="2">									
										<input
											className="btn"
											type="submit"
											value="LOGIN"
											onClick={this.handleSubmit}
										/>										
									</td>
								</tr>
							</tbody>
						</table>
					</form>					
				</div>
				{ 
					toastVisible ? 
					(
						<div className="errToast" onClick={()=>this.setState({toastVisible: false})}>
							<p><Warning /></p>
							<p className="errorMessage">{`Warning: ${this.state.errorMessage}`}</p>
						</div>
					)
					:
					null
				}
			</div>
		);
	}
}
export default Login;
