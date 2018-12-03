import React, { Component, Fragment } from "react";
import "./AdminPage.css";
import firebase from "firebase";
import { KeyboardArrowDown , KeyboardArrowUp} from "@material-ui/icons";

const avatar = "https://firebasestorage.googleapis.com/v0/b/mailerz-fbb71.appspot.com/o/Profile%2Favatar.png?alt=media&token=e9f1053b-bba4-4d4d-8cc0-2f338bdde003";

export default class MailmanLetters extends Component {
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
                    console.log("Data successfully fetched");
                });
            })
            .catch(err => {
                console.log("Error getting documents:", err);
            });
    }

    render() {
        const { users,contentVisible } = this.state;
        return (
            <Fragment>
                <div className="mailersContainerA">
                    <div className="mailersHeaderA">                        
                        LETTERS
                        {contentVisible ? <KeyboardArrowUp onClick={()=>this.setState({contentVisible: false})}/> : <KeyboardArrowDown onClick={()=>this.setState({contentVisible: true})}/>}
                    </div>
                    {
                        !contentVisible ?
                        null :
                        (
                            <div className="theBatchContainerA">                        
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>PROFILE</th>
                                        </tr>
                                        {users.map((user, index) => (
                                            <Fragment key={index}>
                                                <tr className="lowerBorder">
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
                                                            <div className="userName">
                                                                <p className="userNameText">
                                                                    {users.length > 0
                                                                        ? user.userName
                                                                        : " "}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <div className="batchCellHeadersA">
                                                            LETTER ID
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="textContainer">
                                                            <p>RECEIVER</p>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="batchCellHeadersA">
                                                            DELIVERY LOCATION
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="batchCellHeadersA">
                                                            DELIVERED
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="batchCellHeadersA">
                                                            RECEIVED BY
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="batchCellHeadersA">
                                                            RECEIVED ON
                                                        </div>
                                                    </th>                                            
                                                </tr>                                        
                                                {users.length <= 0
                                                    ? null
                                                    : user.batches.map(
                                                        (batch, index) => (
                                                            <Fragment key={index}>
                                                                {users.length <= 0
                                                                    ? null
                                                                    : batch.letters.map(
                                                                            (
                                                                                letter,
                                                                                index
                                                                            ) => (
                                                                                <Fragment
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    <tr>
                                                                                        <td
                                                                                        >
                                                                                            <div className="textContainer">                                                                                        
                                                                                                {batch
                                                                                                    .letters
                                                                                                    .length >
                                                                                                0
                                                                                                    ? letter.letterID
                                                                                                    : " "}                                                                                    
                                                                                            </div>
                                                                                        </td>
                                                                                        <td
                                                                                        >
                                                                                            <div className="textContainer">                                                                                        
                                                                                                {batch
                                                                                                    .letters
                                                                                                    .length >
                                                                                                0
                                                                                                    ? letter.receiver
                                                                                                    : " "}                                                                                        
                                                                                            </div>
                                                                                        </td>
                                                                                        <td
                                                                                        >
                                                                                            <div className="textContainer">                                                                                        
                                                                                                {batch
                                                                                                    .letters
                                                                                                    .length >
                                                                                                0
                                                                                                    ? letter.location
                                                                                                    : " "}                                                                                        
                                                                                            </div>
                                                                                        </td>
                                                                                        <td
                                                                                        >
                                                                                            <div
                                                                                                className={
                                                                                                    batch
                                                                                                        .letters
                                                                                                        .length >
                                                                                                    0
                                                                                                        ? letter.isDelivered
                                                                                                            ? "trueTextContainer"
                                                                                                            : "falseTextContainer"
                                                                                                        : " "
                                                                                                }
                                                                                            >
                                                                                                <p className="booleanText">
                                                                                                    {batch
                                                                                                        .letters
                                                                                                        .length >
                                                                                                    0
                                                                                                        ? letter.isDelivered.toString()
                                                                                                        : "---"}
                                                                                                </p>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td
                                                                                        >
                                                                                            <div className="textContainer">                                                                                        
                                                                                                {batch
                                                                                                    .letters
                                                                                                    .length >
                                                                                                0
                                                                                                    ? letter.isDelivered
                                                                                                        ? letter.receivedBy
                                                                                                        : "N/A"
                                                                                                    : " "}                                                                                        
                                                                                            </div>
                                                                                        </td>
                                                                                        <td
                                                                                        >
                                                                                            <div className="textContainer">                                                                                        
                                                                                                {batch
                                                                                                    .letters
                                                                                                    .length >
                                                                                                0
                                                                                                    ? letter.isDelivered
                                                                                                        ? letter.dateReceived.substr(0, letter.dateReceived.indexOf('GMT'))                                                                                                    
                                                                                                        : "N/A"
                                                                                                    : " "}                                                                                       
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                </Fragment>
                                                                            )
                                                                        )}
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
