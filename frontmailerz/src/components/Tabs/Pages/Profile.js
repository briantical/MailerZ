import React, { Component } from "react";
import firebase from "firebase";
import './Pages.css'


const storageService = firebase.storage();
const storageRef = storageService.ref();
let selectedFile;

export default class Profile extends Component {
	constructor(props){
		super(props)
		this.state ={
			file:null,
			userImage: "",
			userName: "",
			phoneNumber: "",
			roleID: "",
			email: "",
			address: "",
			branch: "",
			userID: ""
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.getUserImage(user.email);
			} else {
				this.setState({ userImage: null });
			}
		});
	}
	
	getUserImage = userEmail => {
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
						userImage: doc.data().userImage,
						userName: doc.data().userName,
						phoneNumber: doc.data().userPhoneNumber,
						roleID: doc.data().userRoleID,
						email: doc.data().userEmail,
						address: doc.data().userAddress,
						branch: doc.data().branchID,
						userID: doc.data().userID,
					});
				});
			});
	};

	handleFileUploadChange =(e) =>{
		selectedFile = e.target.files[0];
	  }

	handleFileUploadSubmit =()=>{	
		const uploadTask = storageRef.child(`Profile/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory

		uploadTask.on('state_changed', (snapshot) => {
		// Observe state change events such as progress, pause, and resume
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
				case firebase.storage.TaskState.PAUSED: // or 'paused'
					console.log('Upload is paused');
					break;
				case firebase.storage.TaskState.RUNNING: // or 'running'
					console.log('Upload is running');
					break;			
				default:
					console.log("");
			}
		}, (error) => {
		  // Handle unsuccessful uploads
		  console.log(error);
		}, () => {
		   // Do something once upload is complete
		   uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
			this.setState({userImage: downloadURL});
			this.updateImage(this.state.email,downloadURL);
			
		  });		
		   console.log('success');
		});	  
	}	

	signOutUser =()=>{
		firebase.auth().signOut().then(function() {
			console.log('Signed Out');
		  }, function(error) {
			console.error('Sign Out Error', error);
		  });
	}

	updateImage=(userEmail, theURL)=>{
		let db = firebase.firestore();
		// Disable deprecated features
		db.settings({
		timestampsInSnapshots: true
		});

		let mailerzRef = db.collection("mailerz").doc(userEmail);
		// Set the "capital" field of the city 'DC'
		return mailerzRef.update({
			userImage: theURL
		})
		.then(()=> {
			console.log("Document successfully updated!");
		})
		.catch((error)=> {
			// The document probably doesn't exist.
			console.error("Error updating document: ", error);
		});
	}

	render() {
		const {userImage, userName,phoneNumber,roleID, email,address,branch,userID, file} = this.state		
		return (
			<div className="pageContainer">
				<div className="pageHeader">PROFILE</div>
				<div className="pageContent">
					<div className="userProfile">
						<div className="imageConatiner">
							<img alt="profile_pic" className="imageStyle" src={userImage !== "null" ?  userImage : require('../../../assets/avatar.png')}/>
						</div>

						<div id="filesubmit" className="uploadProfile">						
							<label htmlFor="avatar">Choose a new picture:</label>
							<input id ="avatar" type="file" className="file-select" accept="image/*" onChange={this.handleFileUploadChange}/>
							<button className="file-submit" onClick={()=> this.handleFileUploadSubmit()}>SUBMIT</button>
						</div>

						<div>
							<table>
								<tbody>
									<tr>
										<td>
											<div className="cellHeaders">
												NAME:
											</div>
										</td>
										<td>
											<div  className="cellValues">
												{userName}
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="cellHeaders">
												EMAIL:
											</div>
										</td>
										<td>
											<div  className="cellValues">
												{email}
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="cellHeaders">
												PHONE NUMBER:
											</div>
										</td>
										<td>
											<div  className="cellValues">
												{phoneNumber}
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="cellHeaders">
												ADDRESS:
											</div>
										</td>
										<td>
											<div  className="cellValues">
												{address}
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="cellHeaders">
												BRANCH:
											</div>
										</td>
										<td>
											<div  className="cellValues">
												{branch === "br001" ? "Kampala" : "Outside Kampala"}
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="cellHeaders">
												USER ID:
											</div>
										</td>
										<td>
											<div  className="cellValues">
												{userID}
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="cellHeaders">
												ROLE:
											</div>
										</td>
										<td>
											<div  className="cellValues">
												{roleID === "r0001" ? "Adminstrator" : roleID === "r0002" ? "Mailman" : "Unassigned role"}
											</div>
										</td>
									</tr>
									<tr className="theBtnsignout" colSpan="2">
										<td colSpan="2" >
											<div className="signoutBtn" onClick={()=>this.signOutUser()}>
												SIGNOUT
											</div>
										</td>										
									</tr>										
								</tbody>
							</table>
						</div>						
					</div>					
				</div>
			</div>
		);
	}
}
