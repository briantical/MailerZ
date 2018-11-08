import firebase from "firebase";

const config = {
	apiKey: "AIzaSyA3O--jp3P8ByWlX-BFyUNK208maVTF66s",
	authDomain: "mailerz-f32b2.firebaseapp.com",
	databaseURL: "https://mailerz-f32b2.firebaseio.com",
	projectId: "mailerz-f32b2",
	storageBucket: "mailerz-f32b2.appspot.com",
	messagingSenderId: "214143073906"
};
const FireConfig = firebase.initializeApp(config);
export default FireConfig;
