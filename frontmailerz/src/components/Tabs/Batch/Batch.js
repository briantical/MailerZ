import React, { Component, Fragment } from "react";
import "./Batch.css";
import { KeyboardArrowRight , KeyboardArrowLeft} from "@material-ui/icons";
import firebase from "firebase";

export default class Batches extends Component {
	constructor(props) {
		super(props);
		this.state = {
			batches: [],
			letters: []
		};
	}

	componentDidMount() {
		const firestore = firebase.firestore();
		const settings = { /* your settings... */ timestampsInSnapshots: true };
		firestore.settings(settings);

		firebase
			.firestore()
			.collection("mailerz")
			.where("userEmail", "==", this.props.personalEmail)
			.onSnapshot(querySnapshot => {
				querySnapshot.forEach(doc => {
					this.setState({
						batches: doc.data().batches,
						letters: doc.data().batches[this.props.theActiveBatch]
							.letters
					});
				});
			});
	}

	render() {
		return (
			<Fragment>
			<div className="mailersContainer">
				<div className="mailersHeader">
					<KeyboardArrowLeft onClick={() => this.props.goHome()}/>
					LETTERS
				</div>
				{this.state.letters.map((letter, index) => (
					<div
						className="theBatchContainer"
						key={index}
						id={index}
						onClick={() => {
							this.props.changeDisplay();
							this.props.changeLetter(index);
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
											RECEIVER NAME:
										</td>
										<td className="batchCellValues">{letter.receiver}</td>
									</tr>
									<tr>
										<td className="batchCellHeaders">P.O.BOX:</td>
										<td className="batchCellValues">{letter.receiverPoBox}</td>
									</tr>
									<tr>
										<td className="batchCellHeaders">
											LOCATION:
										</td>
										<td className="batchCellValues">{letter.location}</td>
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
