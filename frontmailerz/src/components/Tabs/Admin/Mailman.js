import React, { Component, Fragment } from "react";
import "./AdminPage.css";
import firebase from "firebase";
import { KeyboardArrowDown , KeyboardArrowUp} from "@material-ui/icons";

const avatar = "https://firebasestorage.googleapis.com/v0/b/mailerz-fbb71.appspot.com/o/Profile%2Favatar.png?alt=media&token=e9f1053b-bba4-4d4d-8cc0-2f338bdde003";

export default class Mailman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleContent: false,
            users: [],
            batches: [],
            letters: [],
            usersNames: [],
            usersImages: [],
            theImages: []
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
                        //usersNames: [...this.state.usersNames, doc.data().userName]
                    });
                    //this.getImageName([...this.state.usersNames, doc.data().userName]);
                    //this.getAllImages();
                    console.log("Data successfully fetched");
                });
            })
            .catch(err => {
                console.log("Error getting documents:", err);
            });
    }

    getImageName = (usersNames) =>{ 
       usersNames.map((userName,index)=>{
            if(usersNames.length > 0){
                let imageName = userName.substr(0, userName.indexOf(' ')) + ".jpg";       
                let imagePath = "Profile/" + imageName;      
                this.showImage(imagePath);
            }
            return ""
       })          
    }

    showImage =(fileName)=> {                  
        let storageRef = firebase.storage().ref();        
        storageRef.child(fileName).getDownloadURL().then(function(url) {             
            this.setState({usersImages: [...this.state.usersImages,url]}) 
            console.log("The is the image url: " + url)                                   
        }).catch(function(error) {
            console.log("Error in getting image:" +JSON.stringify(error));
            console.log("The filename is: " +  fileName)
            this.setState({usersImages: [...this.state.usersImages,avatar]})    
        });
        return avatar               
    }

    render() {
        const { users , contentVisible} = this.state;   
            
        return (
            <Fragment>
                <div className="mailersContainerA">
                    <div className="mailersHeaderA">                        
                        MAILMEN
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
                                            <th>EMAIL</th>
                                            <th>PHONE NUMBER</th>
                                            <th>ADDRESS</th>
                                            <th>BRANCH</th>
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
                                                                    <b>{users.length > 0
                                                                        ? user.userName
                                                                        : " "} 
                                                                    </b>                                                       
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="textContainer">                                                    
                                                            {users.length > 0
                                                                ? user.userEmail
                                                                : " "}                                                    
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="textContainer">                                                   
                                                            {users.length > 0
                                                                ? user.userPhoneNumber
                                                                : " "}                                                    
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="textContainer">                                                    
                                                            {users.length > 0
                                                                ? user.userAddress
                                                                : " "}                                                    
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="textContainer">                                                    
                                                            {users.length > 0
                                                                ? user.branchID === "br001" ? "Kampala Branch" : "Region Branch"
                                                                : " "}                                                    
                                                        </div>
                                                    </td>
                                                </tr>
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
