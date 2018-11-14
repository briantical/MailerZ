import React, { Component, Fragment } from "react";
import "./AdminPage.css";
import firebase from "firebase";


export default class MailmanBatches extends Component {
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
                        users : [...this.state.users,doc.data()],
                        batches :doc.data().batches
                    })
                  console.log("Data succesfully fetched");
                });
              })
              .catch(err => {
                console.log('Error getting documents:', err);
              });				
    }
    
	render() {      
        const {users}  = this.state                
		return (
			<Fragment>
				<div className="batch">
					<div className="batchDetails">
                        <div className="theHeadings">
                            <h4 className="theMailManTitile">THE BATCHES</h4>   
                        </div>                        
						<table>
							<tbody>
								<tr>                                      
									<th>PROFILE</th>									
								</tr>
                                {
                                    users.map((user, index)=>(            
                                        <Fragment key={index}>
                                            <tr>                                    
                                                <td>
                                                    <div className="user">
                                                        <div className="userImage">
                                                        <img alt="profile_pic" src={users.length > 0 ? user.userImage === "null" ?  "https://firebasestorage.googleapis.com/v0/b/mailerz-fbb71.appspot.com/o/Profile%2Favatar.png?alt=media&token=e9f1053b-bba4-4d4d-8cc0-2f338bdde003" : user.userImage : require('./avatar.png') } className="profilePic"/>
                                                        </div>
                                                        <div className="userName">
                                                            <p>{users.length > 0 ? user.userName : " "}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <div className="textContainer">
                                                        <p>BATCH ID</p>
                                                    </div>                                   
                                                </th>
                                                <th>
                                                    <div className="textContainer">
                                                        <p>TOTAL BATCH LETTERS</p>
                                                    </div>                                   
                                                </th>
                                                <th>
                                                    <div className="textContainer">
                                                        <p>BATCH COMPLETE</p>
                                                    </div>                                   
                                                </th>
                                                <th>
                                                    <div className="textContainer">
                                                        <p>DELIVERY AREA</p>
                                                    </div>                                   
                                                </th>
                                            </tr>
                                            {users.length <= 0 ? null :  user.batches.map((batch,index)=>(
                                                <Fragment key={index}>
                                                    <tr>
                                                        <td>
                                                            <div className="textContainer">
                                                                <p>{user.batches.length > 0 ? batch.batchID : " "}</p>
                                                            </div>                                   
                                                        </td>
                                                        <td>
                                                            <div className="textContainer">
                                                                <p>{user.batches.length > 0 ? batch.totalLetters : " "}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div  className= {user.batches.length > 0 ? batch.isComplete ? "trueTextContainer" : "falseTextContainer" : " "}>
                                                                <p className="booleanText">{user.batches.length > 0 ? batch.isComplete.toString() : "---"}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="textContainer">                                                                
                                                                <p>{user.batches.length > 0 ? batch.isComplete ? batch.location : "N/A" : " "}</p>
                                                            </div>
                                                        </td>
                                                    </tr>	
                                                </Fragment>
                                            )) }                                           
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


