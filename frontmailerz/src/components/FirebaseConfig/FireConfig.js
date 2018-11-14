import firebase from "firebase";

const config = {
	//Enter your firebase configurations here
};
const FireConfig = firebase.initializeApp(config);

export const db = firebase.firestore();
export default FireConfig;
