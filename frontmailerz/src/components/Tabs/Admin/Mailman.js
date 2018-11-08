import React, { Component, Fragment } from "react";
import "./AdminPage.css";
import firebase from "firebase";
import avatar from './avatar.png'

export default class Mailman extends Component {
    constructor(props){
        super(props)
        this.state={
            users: [],
            batches: [],
            letters:[],

        }
    }

    componentDidMount() {
		const firestore = firebase.firestore();
  		const settings = {/* your settings... */ timestampsInSnapshots: true};
		firestore.settings(settings);
				  
		firebase
			.firestore()
			.collection("mailerz")
            .where("userRoleID", "==", "r0001")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        users : [...this.state.users,doc.data()]
                    })
                  console.log(doc.id, '=>', doc.data());
                });
              })
              .catch(err => {
                console.log('Error getting documents:', err);
              });				
    }
    
    showRows =()=>{
        const {users}  = this.state
        console.log("Its shown")
        users.map((user, index)=>(            
            <Fragment>
                <tr>                                    
                    <td>
                        <div className="user">
                            <div className="userImage">
                                <img src={require('./avatar.png')} alt='user_profile_picture'/>
                            </div>
                            <div className="userName">
                                <p>{users.length > 0 ? user.userName : " "}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="textContainer">
                            <p>{users.length > 0 ? user.userEmail : " "}</p>
                        </div>                                   
                    </td>
                    <td>
                        <div className="textContainer">
                            <p>{users.length > 0 ? user.userPhoneNumber : " "}</p>
                        </div>
                    </td>
                    <td>
                        <div className="textContainer">
                            <p>{users.length > 0 ? user.userAddress : " "}</p>
                        </div>
                    </td>
                    <td>
                        <div className="textContainer">
                            <p>{users.length > 0 ? user.branchID : " "}</p>
                        </div>
                    </td>
                </tr>	
            </Fragment>
        ))
    }

	render() {      
        const {users}  = this.state
        console.log("This is user :" + JSON.stringify(this.state.users) )        
		return (
			<Fragment>
				<div className="batch">
					<div className="batchDetails">
                        <div className="theHeadings">
                            <h2 className="theMailManTitile">THE MAILMEN</h2>   
                        </div>                        
						<table>
							<tbody>
								<tr>                                      
									<td>PROFILE</td>
									<td>EMAIL</td>
                                    <td>PHONE NUMBER</td>
                                    <td>ADDRESS</td>
                                    <td>BRANCH</td>
								</tr>
                                {
                                    users.map((user, index)=>(            
                                        <Fragment key={index}>
                                            <tr>                                    
                                                <td>
                                                    <div className="user">
                                                        <div className="userImage">
                                                        </div>
                                                        <div className="userName">
                                                            <p>{users.length > 0 ? user.userName : " "}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="textContainer">
                                                        <p>{users.length > 0 ? user.userEmail : " "}</p>
                                                    </div>                                   
                                                </td>
                                                <td>
                                                    <div className="textContainer">
                                                        <p>{users.length > 0 ? user.userPhoneNumber : " "}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="textContainer">
                                                        <p>{users.length > 0 ? user.userAddress : " "}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="textContainer">
                                                        {users.length > 0 ? user.branchID : " "}
                                                    </div>
                                                </td>
                                            </tr>	
                                        </Fragment>
                                    ))
                                }                                															
							</tbody>
						</table>
					</div>
				</div>
			</Fragment>
		);
	}
}


