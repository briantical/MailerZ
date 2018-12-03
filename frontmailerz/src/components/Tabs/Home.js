import React, { Component, Fragment } from "react";
import firebase from "firebase";
import Batches from "./Batch/Batches";
import Batch from "./Batch/Batch";
import Confirmation from "./Batch/Confirmation";
import AdminPage from "./Admin/AdminPage";

import './Index.css'


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			personalEmail: "",
			roleID: "",
			activeIndex: 1,
			activeBatch: 0,
			activeLetter: 0
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
						roleID: doc.data().userRoleID
					});
				});
			});
	};

	checkPermission = theIndex => {
		const { roleID } = this.state;
		if (roleID === "r0001") {
			return <AdminPage />;
		} else if (roleID === "r0002") {
			return this.show(theIndex);
		} else {
			return(
				<div className="noInternet">
					CHECK CONNECTION
				</div>
			)
		}
	};

	signout = () => {
		firebase.auth().signOut();
	};

	changeView = index => {
		this.setState({ activeIndex: index });		
	};

	getBatchIndex = index => {
		this.setState({ activeBatch: index });
	};

	getLetterIndex = index => {
		this.setState({ activeLetter: index });
	};

	show = index => {
		if (index === 1) {
			return (
				<Batches
					personalEmail={this.state.personalEmail}
					changeBatch={this.getBatchIndex}
					changeDisplay={() => this.changeView(2)}
				/>
			);
		} else if (index === 2) {
			return (
				<Batch
					personalEmail={this.state.personalEmail}
					theActiveBatch={this.state.activeBatch}
					changeLetter={this.getLetterIndex}
					changeDisplay={() => this.changeView(3)}
					goHome={() => this.changeView(1)}
				/>
			);
		} else if (index === 3) {
			return (
				<Confirmation
					personalEmail={this.state.personalEmail}
					theActiveBatch={this.state.activeBatch}
					theActiveLetter={this.state.activeLetter}
					changeDisplay={() => this.changeView(2)}
					goHome={() => this.changeView(1)}
				/>
			);
		}
		else{
			return(
				<div className="noInternet">
					POOR CONNECTION
				</div>
			)
		}
	};
	render() {
		return (
			<Fragment>{this.checkPermission(this.state.activeIndex)}</Fragment>
		);
	}
}

export default Home;
