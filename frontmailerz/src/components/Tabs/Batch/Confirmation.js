import React, { Component, Fragment } from "react";
import "./Batch.css";
import firebase from "firebase";


export default class Confirmation extends Component {
	constructor(props) {
		super(props);
		this.state = {			
			batches:[],
			batches2:[],
			letters:[],
			receiverName: '',
			phoneNumber: '',
			specificLetter: [],
			specificLetter2: []		
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
					this.setState(
					{	
							batches: doc.data().batches,
							specificLetter: doc.data().batches[this.props.theActiveBatch].letters[this.props.theActiveLetter],
							specificLetter2: doc.data().batches[this.props.theActiveBatch].letters[this.props.theActiveLetter]							
						})

						var batchesM = doc.data().batches

						for (const batchM of batchesM){
							console.log('Batch: ' + JSON.stringify(batchM))
							this.setState({
								batches2: [
									...this.state.batches2,
									{
										batchID : batchM.batchID,
										totalLetters : batchM.totalLetters,
										isComplete : batchM.isComplete,
										location : batchM.location,
										letters: batchM.letters.map((letter,index)=>(																							
												{
													dateReceived:  letter.dateReceived,
													isDelivered: letter.isDelivered,
													letterID: letter.letterID,
													location: letter.location,                                        
													phoneNumber: letter.phoneNumber,                                        
													receivedBy: letter.receivedBy,
													receiver: letter.receiver,
													receiverPoBox: letter.receiverPoBox
												}											
										))
									}
								]
							})
						}
				})
		
			})
					
	}

	makeConfirmation =(batch)=>{		
		firebase
			.firestore()
			.collection("mailerz")
			.doc(this.props.personalEmail)
			.update({
				batches: batch
			})
			console.log("Update Confirmed")
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });		
	};

	updateLetter =()=>{
		const {specificLetter2, batches2, phoneNumber, receiverName} = this.state
		const {theActiveLetter, theActiveBatch} = this.props
		
		var batches3 = batches2

		const today = new Date()

		batches3[theActiveBatch].letters[theActiveLetter].dateReceived = today
		batches3[theActiveBatch].letters[theActiveLetter].isDelivered = true
		batches3[theActiveBatch].letters[theActiveLetter].letterID = specificLetter2.letterID
		batches3[theActiveBatch].letters[theActiveLetter].location = specificLetter2.location                                       
		batches3[theActiveBatch].letters[theActiveLetter].phoneNumber = phoneNumber                                       
		batches3[theActiveBatch].letters[theActiveLetter].receivedBy = receiverName
		batches3[theActiveBatch].letters[theActiveLetter].receiver = specificLetter2.receiver
		batches3[theActiveBatch].letters[theActiveLetter].receiverPoBox = specificLetter2.receiverPoBox

		this.setState({batches2 : batches3})			
		console.log("Letter updated")
	}

	handleSubmit = event => {
		event.preventDefault();
		this.updateLetter();
		console.log("Updated")		
	};

	fireAway =(batches)=>{
		this.makeConfirmation(batches)
		this.props.changeDisplay();	
		console.log("FIRED AWAY")
	}

	render() {
		const {specificLetter2} = this.state;				
		return (		
			<Fragment>
				<div className="batch">
					<div className="batchDetails">
						<table>
							<tbody>
								<tr>
									<td className="cellHeading">LETTER ID</td>
									<td>{specificLetter2.letterID}</td>
								</tr>
								<tr>
									<td className="cellHeading">RECEIVER NAME:</td>
									<td>{specificLetter2.receiver}</td>
								</tr>
								<tr>
									<td className="cellHeading">P.O.Box</td>
									<td>{specificLetter2.receiverPoBox}</td>
								</tr>
								<tr>
									<td className="cellHeading">RECEIVED ON:</td>
									<td>
									{specificLetter2.isDelivered ? specificLetter2.dateReceived : (
										new Date().toDateString())}
									</td>
									<td>
									{specificLetter2.isDelivered ?  specificLetter2.dateReceived === "Today" ? new Date().toLocaleTimeString() : new Date(specificLetter2.dateReceived).toTimeString().split(" ")[0] : (
										new Date().toLocaleTimeString())}
									</td>
								</tr>
								<tr>
									<td className="cellHeading">RECEIVED BY:</td>
									<td>
									{specificLetter2.isDelivered ? specificLetter2.receivedBy : (<input
											name="receiverName"
											type="text"
											defaultValue={specificLetter2.receivedBy}
											onChange={this.handleChange}
										/>) }										
									</td>
								</tr>
								<tr>
									<td className="cellHeading">PHONE NUMBER:</td>
									<td>
									{specificLetter2.isDelivered ? specificLetter2.phoneNumber : (
										<input
											name="phoneNumber"
											type="text"
											defaultValue={specificLetter2.phoneNumber}
											onChange={this.handleChange}
										/>
									) }											
									</td>
								</tr>
								<tr>
									<td>
									{specificLetter2.isDelivered ? null : (
										<input
											type="submit"
											value="Submit"
											onClick={this.handleSubmit}
										/>
									) }											
									</td>
									<td>
									{specificLetter2.isDelivered ? null : (
										<input
											type="submit"
											value="CONFIRM"
											onClick={()=>this.fireAway(this.state.batches2)}
										/>
									) }										
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<br/>
					<br/>
					<button onClick={()=>this.props.changeDisplay()}>BACK</button>
				</div>
			</Fragment>
		);
	}
}
