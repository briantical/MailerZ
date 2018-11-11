import firebase from "firebase";

const config = {
	apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};
const FireConfig = firebase.initializeApp(config);

export const db = firebase.firestore();
export default FireConfig;
