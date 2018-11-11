import React, { Component, Fragment } from "react";
import "./AdminPage.css";
import firebase from "firebase";


export default class MailmanLetters extends Component {
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
                  console.log("Data successfully fetched");
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
                            <h4 className="theMailManTitile">THE LETTERS</h4>   
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
                                                        <img alt="profile_pic" src={users.length > 0 ? user.userImage : require('./avatar.png') } className="profilePic"/>                                
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
                                                        <p>LETTER ID</p>
                                                    </div>                                   
                                                </th>
                                                <th>
                                                    <div className="textContainer">
                                                        <p>RECEIVER</p>
                                                    </div>                                   
                                                </th>
                                                <th>
                                                    <div className="textContainer">
                                                        <p>DELIVERY LOCATION</p>
                                                    </div>                                   
                                                </th>
                                                <th>
                                                    <div className="textContainer">
                                                        <p>DELIVERED</p>
                                                    </div>                                   
                                                </th>
                                                <th>
                                                    <div className="textContainer">
                                                        <p>RECEIVED BY</p>
                                                    </div>                                   
                                                </th>                                                
                                                <th>
                                                    <div className="textContainer">
                                                        <p>RECEIVED ON</p>
                                                    </div>                                   
                                                </th>
                                            </tr>
                                            {users.length <= 0 ? null :  user.batches.map((batch,index)=>(
                                                <Fragment key={index}>
                                                    {users.length <= 0 ? null : batch.letters.map((letter, index) =>(
                                                        <Fragment key={index}>
                                                            <tr>
                                                                <td>
                                                                    <div className="textContainer">
                                                                        <p>{batch.letters.length > 0 ? letter.letterID : " "}</p>
                                                                    </div>                                   
                                                                </td>
                                                                <td>
                                                                    <div className="textContainer">
                                                                        <p>{batch.letters.length > 0 ? letter.receiver : " "}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="textContainer">
                                                                        <p>{batch.letters.length > 0 ? letter.location : " "}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className= {batch.letters.length > 0 ? letter.isDelivered ? "trueTextContainer" : "falseTextContainer" : " "}>
                                                                        <p className="booleanText">{batch.letters.length > 0 ? letter.isDelivered.toString() : "---"}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="textContainer">
                                                                        <p>{batch.letters.length > 0 ? letter.isDelivered ? letter.receivedBy : "N/A" : " "}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="textContainer">
                                                                        <p>{batch.letters.length > 0 ? letter.isDelivered ? letter.dateReceived : "N/A" : " "}</p>
                                                                    </div>
                                                                </td>
                                                            </tr>	
                                                        </Fragment>                                                        
                                                    ))}
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


