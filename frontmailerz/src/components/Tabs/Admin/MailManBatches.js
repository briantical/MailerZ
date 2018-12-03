import React, { Component, Fragment } from "react";
import "./AdminPage.css";
import firebase from "firebase";
import { KeyboardArrowDown , KeyboardArrowUp} from "@material-ui/icons";

const avatar = "https://firebasestorage.googleapis.com/v0/b/mailerz-fbb71.appspot.com/o/Profile%2Favatar.png?alt=media&token=e9f1053b-bba4-4d4d-8cc0-2f338bdde003";

export default class MailmanBatches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentVisible: false,
            users: [],
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
            .where("userRoleID", "==", "r0002")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        users: [...this.state.users, doc.data()],
                        batches: doc.data().batches
                    });
                    console.log("Data succesfully fetched");
                });
            })
            .catch(err => {
                console.log("Error getting documents:", err);
            });
    }

    checkCompletion = (batch) =>{
        let completeLetters = 0;

        batch.letters.forEach(letter => {
            if(letter.isDelivered === true){
                completeLetters++;
            }
        });
        if(completeLetters === batch.totalLetters){           
            return true
        }else{            
            return false
        }
    }
    
    render() {
        const { users,contentVisible } = this.state;
        return (
            <Fragment>
                <div className="mailersContainerA">
                    <div className="mailersHeaderA">                        
                            BATCHES
                            {contentVisible ? <KeyboardArrowUp onClick={()=>this.setState({contentVisible: false})}/> : <KeyboardArrowDown onClick={()=>this.setState({contentVisible: true})}/>}
                    </div>
                    {
                        !contentVisible ?
                        null :
                        (
                            <div  className="theBatchContainerA">                        
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>PROFILE</th>
                                        </tr>
                                        {users.map((user, index) => (
                                            <Fragment key={index}>
                                                <tr>
                                                    <td>
                                                        <div className="user">
                                                            <div className="userImage">
                                                                <img
                                                                    alt="profile_pic"
                                                                    src={
                                                                        users.length > 0
                                                                            ? user.userImage ===
                                                                            "null"
                                                                                ? avatar
                                                                                : user.userImage
                                                                            : require("./avatar.png")
                                                                    }
                                                                    className="profilePic"
                                                                />
                                                            </div>
                                                            <div className="textContainer">                                                       
                                                                {users.length > 0
                                                                    ? user.userName
                                                                    : " "}                                                        
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <div className="batchCellHeadersA">
                                                            BATCH ID
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="batchCellHeadersA">
                                                            TOTAL BATCH LETTERS
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="batchCellHeadersA">
                                                            BATCH COMPLETE
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="batchCellHeadersA">
                                                            DELIVERY AREA
                                                        </div>
                                                    </th>
                                                </tr>
                                                {users.length <= 0
                                                    ? null
                                                    : user.batches.map(
                                                        (batch, index) => (
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    <td>
                                                                        <div className="textContainer">
                                                                            <p>
                                                                                {user
                                                                                    .batches
                                                                                    .length >
                                                                                0
                                                                                    ? batch.batchID
                                                                                    : " "}
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="textContainer">                                                                      
                                                                                {user
                                                                                    .batches
                                                                                    .length >
                                                                                0
                                                                                    ? batch.totalLetters
                                                                                    : " "}                                                                      
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            className={
                                                                                user
                                                                                    .batches
                                                                                    .length >
                                                                                0
                                                                                    ? this.checkCompletion( batch)
                                                                                        ? "trueTextContainer"
                                                                                        : "falseTextContainer"
                                                                                    : " "
                                                                            }
                                                                        >
                                                                            <p className="booleanText">
                                                                                {user
                                                                                    .batches
                                                                                    .length >
                                                                                0
                                                                                    ? this.checkCompletion( batch).toString()
                                                                                    : "---"}
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="textContainer">                                                                      
                                                                            {user
                                                                                .batches
                                                                                .length >
                                                                            0
                                                                                ? this.checkCompletion( batch)
                                                                                    ? batch.location
                                                                                    : "N/A"
                                                                                : " "}                                                                    
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </Fragment>
                                                        )
                                                    )}
                                            </Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    }                    
                </div>
            </Fragment>
        );
    }
}
