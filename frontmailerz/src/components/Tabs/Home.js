import React, { Component, Fragment } from "react";
import FireConfig from "../FirebaseConfig/FireConfig";
import Batches from "./Batch/Batches";
import Batch from "./Batch/Batch";
import Confirmation from "./Batch/Confirmation";
import AdminPage from './Admin/AdminPage'

import firebase from "firebase";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			personalEmail: '',
			roleID: '',
			activeIndex: 1,
			activeBatch: 0,
			activeLetter: 0
		};
	}

	componentDidMount(){		
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
						roleID : doc.data().userRoleID
					})
				})
			})
	}

	checkPermission=(theIndex)=>{
		const {roleID}  = this.state
		if(roleID === 'r0001'){
			return <AdminPage/>
		}else if(roleID === 'r0002'){
			return this.show(theIndex)
		}else{
			console.log("Invalid user")
		}		
	}

	signout = () => {
		FireConfig.auth().signOut();
	};

	changeView = index => {
		this.setState({ activeIndex: index });
		console.log('change View Pressed')
	};

	
	getBatchIndex = index => {	
		console.log('Index: ' + index)			
		this.setState({ activeBatch: index });			
	};


	getLetterIndex = index => {					
		this.setState({ activeLetter: index });		
	};

	show = index => {
		if (index === 1) {
			return <Batches personalEmail={this.state.personalEmail} changeBatch={this.getBatchIndex} changeDisplay={() => this.changeView(2)} />;
		} else if (index === 2) {
			return <Batch personalEmail={this.state.personalEmail} theActiveBatch={this.state.activeBatch} changeLetter={this.getLetterIndex} changeDisplay={() => this.changeView(3)} />;
		} else if (index === 3) {
			return <Confirmation personalEmail={this.state.personalEmail} theActiveBatch={this.state.activeBatch} theActiveLetter={this.state.activeLetter} changeDisplay={() => this.changeView(1)} />;
		}
	};
	render() {
		return <Fragment>{this.checkPermission(this.state.activeIndex)}</Fragment>;
	}
}

export default Home;
