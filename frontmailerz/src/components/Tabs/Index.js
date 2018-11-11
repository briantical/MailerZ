import React, { Component } from "react";
import FireConfig from "../FirebaseConfig/FireConfig";
import Header from "./Header/Header";
import Drawer from "./Drawer/Drawer";
import Backdrop from "./Backdrop/Backdrop";

import Profile from "./Pages/Profile";
import FAQs from "./Pages/FAQs";
import Settings from "./Pages/Settings";
import Rate from "./Pages/Rate";
import About from "./Pages/About";

import Home from "./Home";
import "./Index.css";

import firebase from "firebase";

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeDisplay: 2,
			drawerVisible: false,
			userImage : "",
			userName: ""
		};
	}

	componentDidMount(){		
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.getUserImage(user.email)
			} else {
				this.setState({ userImage: null });
			}
		});		
	}

	getUserImage=(userEmail)=>{
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
						userImage : doc.data().userImage,
						userName: doc.data().userName
					})
				})
			})
	}

	openDrawer = () => {
		this.setState(prevState => {
			return { drawerVisible: !prevState.drawerVisible };
		});
	};

	closeDrawer = () => {
		this.setState({ drawerVisible: false });
	};

	signout = () => {
		FireConfig.auth()
			.signOut()
			.then(console.log("User successfully signed out"));
	};

	changeDisplay = event => {					
		this.setState({ activeDisplay: parseInt(event.target.id, 10) });
		this.closeDrawer();
	};

	showDisplay = index => {
		
		if(index === 1)
			return <Profile />;
		else if (index === 2)
			return <Home />;
		else if (index === 3)
			return <Rate />;
		else if (index === 4)
			return <FAQs/>
		else if(index === 5)
			return <Settings/>
		else if(index === 6)
			return <Rate/>
		else if(index === 7)
			return <About/>
		else 
			return console.log("Wrong entry made");		
	};

	render() {
		let the_backdrop;

		if (this.state.drawerVisible) {
			the_backdrop = <Backdrop closer={this.closeDrawer} />;
		}

		return (
			<div style={{ height: "100%" }}>
				<Header clickDrawer={this.openDrawer} />
				<Drawer
					show={this.state.drawerVisible}
					profilePic={this.state.userImage}
					display={this.changeDisplay}
					profileName={this.state.userName}
				/>
				{the_backdrop}
				<div className="content_area">
					<div className="homeContent">						
						{this.showDisplay(this.state.activeDisplay)}
					</div>
				</div>
			</div>
		);
	}
}

export default Index;
