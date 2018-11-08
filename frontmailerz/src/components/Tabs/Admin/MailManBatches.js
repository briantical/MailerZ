import React, { Component, Fragment } from "react";
import "./AdminPage.css";
import firebase from "firebase";
import avatar from './avatar.png'

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
            .where("userRoleID", "==", "r0001")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        users : [...this.state.users,doc.data()],
                        batches :doc.data().batches
                    })
                  console.log(doc.id, '=>', doc.data());
                });
              })
              .catch(err => {
                console.log('Error getting documents:', err);
              });				
    }
    
	render() {      
        const {users,batches}  = this.state
        console.log("This is batches :" + JSON.stringify(this.state.batches) )        
		return (
			<Fragment>
				<div className="batch">
					<div className="batchDetails">
                        <div className="theHeadings">
                            <h2 className="theMailManTitile">THE BATCHES</h2>   
                        </div>                        
						<table>
							<tbody>
								<tr>                                      
									<td>PROFILE</td>									
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
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="textContainer">
                                                        <p>BATCH ID</p>
                                                    </div>                                   
                                                </td>
                                                <td>
                                                    <div className="textContainer">
                                                        <p>TOTAL BATCH LETTERS</p>
                                                    </div>                                   
                                                </td>
                                                <td>
                                                    <div className="textContainer">
                                                        <p>BATCH COMPLETE</p>
                                                    </div>                                   
                                                </td>
                                                <td>
                                                    <div className="textContainer">
                                                        <p>DELIVERY AREA</p>
                                                    </div>                                   
                                                </td>
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
                                                                {user.batches.length > 0 ? batch.location : " "}
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


