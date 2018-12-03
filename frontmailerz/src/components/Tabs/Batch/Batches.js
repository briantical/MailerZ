import React, { Component, Fragment } from "react";
import "./Batch.css";
import { KeyboardArrowRight } from "@material-ui/icons";
import firebase from "firebase";

export default class Batches extends Component {
	constructor(props) {
		super(props);
		this.state = {
			personalEmail: "",
			batches: []
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ personalEmail: user.email });
				this.getRoleID(user.email);
			} else {
				this.setState({ personalEmail: null });
			}
		});
	}

	getRoleID = userEmail => {
		const firestore = firebase.firestore();
		const settings = { /* your settings... */ timestampsInSnapshots: true };
		firestore.settings(settings);

		firebase
			.firestore()
			.collection("mailerz")
			.where("userEmail", "==", userEmail)
			.onSnapshot(querySnapshot => {
				querySnapshot.forEach(doc => {
					this.setState({
						batches: doc.data().batches
					});
				});
			});
	};

	checkDeliveries = (batch) =>{
        let deliveredLetters = 0;

        batch.letters.forEach(letter => {
            if(letter.isDelivered === true){
                deliveredLetters++;
            }
        });
        return deliveredLetters
	}
	
	render() {
		return (
			<Fragment>
			<div className="mailersContainer">
				<div className="mailersHeader">
					BATCHES
				</div>
				{this.state.batches.map((batch, index) => (					
					<div
						className="theBatchContainer"
						key={index}
						id={index}
						onClick={() => {
							this.props.changeDisplay();
							this.props.changeBatch(index);
						}}
					>
						<div className="batchIndex">
							{index + 1}
						</div>
						<div className="theBatchDetails">
							<table>
								<tbody>
									<tr>
										<td className="batchCellHeaders">
											BATCH ID
										</td>
										<td className="batchCellValues">{batch.batchID}</td>
									</tr>
									<tr>
										<td className="batchCellHeaders">
											LOCATION:
										</td>
										<td className="batchCellValues">{batch.location}</td>
									</tr>
									<tr>
										<td className="batchCellHeaders">
											LETTERS:
										</td>
										<td className="batchCellValues">{batch.totalLetters}</td>
									</tr>
									<tr>
										<td className="batchCellHeaders">
											DELIVERED:
										</td>
										<td className="batchCellValues">{this.checkDeliveries(batch)}</td>
									</tr>
									<tr>
										<td className="batchCellHeaders">
											COMPLETED:
										</td>
										<td className="batchCellValues">{batch.isComplete.toString() ? "YES" : "NO"}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div>
							<KeyboardArrowRight />
						</div>
					</div>
				))}
				</div>
			</Fragment>
		);
	}
}
