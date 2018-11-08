import React, { Component, Fragment } from "react";
import "./Batch.css";
import { KeyboardArrowRight } from "@material-ui/icons";
import firebase from "firebase";


export default class Batches extends Component {
	constructor(props) {
		super(props);
		this.state = {
			batches:[],
			letters:[]
		};
	}

	componentDidMount() {
		const firestore = firebase.firestore();
  		const settings = {/* your settings... */ timestampsInSnapshots: true};
		firestore.settings(settings);
		  
		firebase
			.firestore()
			.collection("mailerz")
			.where("userEmail", "==", this.props.personalEmail)
			.onSnapshot(querySnapshot => {
				querySnapshot.forEach(doc => {
					console.log('The Doc: ' + JSON.stringify(doc.data().batches))
					this.setState({batches: doc.data().batches, letters: doc.data().batches[this.props.theActiveBatch].letters})
				});
			});
		
	}

	
	render() {
		return (
			<Fragment>
				{this.state.letters.map((letter, index) => (
					<div 
					className="batchContainer" 
					key={index}
					id={index}
					onClick={()=>{
						this.props.changeDisplay()
						this.props.changeLetter(index)
					}}
					>
						<div className="batchDetails">
							<table>
								<tbody>
									<tr>
										<td className="cellHeading">RECEIVER NAME:</td>
										<td>{letter.receiver}</td>
									</tr>
									<tr>
										<td className="cellHeading">P.O.Box</td>
										<td>{letter.receiverPoBox}</td>
									</tr>
									<tr>
										<td className="cellHeading">LOCATION:</td>
										<td>{letter.location}</td>
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
