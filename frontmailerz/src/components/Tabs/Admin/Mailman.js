import React, { Component, Fragment } from "react";
import "./AdminPage.css";
import firebase from "firebase";


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
            .where("userRoleID", "==", "r0002")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        users : [...this.state.users,doc.data()]
                    })
                  console.log("Data successfully fetched");
                });
              })
              .catch(err => {
                console.log('Error getting documents:', err);
              });				
    }
    
    
	render() {      
        const {users}  = this.state 
        console.log("This user: " + users)            
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
                                                            <img alt="profile_pic" src={users.length > 0 ? user.userImage : require('./avatar.png') } className="profilePic"/>                                                            
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


