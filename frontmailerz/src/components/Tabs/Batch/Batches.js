import React, { Component, Fragment } from "react";
import "./Batch.css";
import { KeyboardArrowRight } from "@material-ui/icons";
import firebase from "firebase";


export default class Batches extends Component {

	constructor(props) {
		super(props);
		this.state = {
			personalEmail: '',
			batches:[],			
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ personalEmail : user.email });
				this.getRoleID(user.email)			
			} else {
				this.setState({ personalEmail: null });
			}
		});	
		
	}

	getRoleID=(userEmail)=>{
		const firestore = firebase.firestore();
		const settings = {/* your settings... */ timestampsInSnapshots: true};
		firestore.settings(settings); 
		
		firebase
			.firestore()
			.collection("mailerz")
			.where("userEmail", "==", userEmail)
			.onSnapshot(querySnapshot => {
				querySnapshot.forEach(doc => {
					this.setState({
						batches: doc.data().batches
					})
				})
			})
	}
	
	

	render() {		
		return (
			<Fragment>				
				{this.state.batches.map((batch, index) => (
					<div
						className="batchContainer"
						key={index}
						id={index}
						onClick={()=>{
							this.props.changeDisplay()
							this.props.changeBatch(index)
							}}
					>
						<div className="batchDetails">
							<table>
								<tbody>
									<tr>
										<td className="cellHeading">
											BATCH ID
										</td>
										<td>{batch.batchID}</td>
									</tr>
									<tr>
										<td className="cellHeading">LOCATION:</td>
										<td>{batch.location}</td>
									</tr>
									<tr>
										<td className="cellHeading">TOTAL LETTERS:</td>
										<td>{batch.totalLetters}</td>
									</tr>
									<tr>
										<td className="cellHeading">COMPLETED:</td>
										<td>{batch.isComplete.toString()}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div>
							<KeyboardArrowRight />
						</div>
					</div>
				))}
			</Fragment>
		);
	}
}
