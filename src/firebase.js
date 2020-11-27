import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCsc-Yj7P4Z0mHH2qFthViqpfe0bhVSX0s",
    authDomain: "whatsapp-clone-91a11.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-91a11.firebaseio.com",
    projectId: "whatsapp-clone-91a11",
    storageBucket: "whatsapp-clone-91a11.appspot.com",
    messagingSenderId: "523171704328",
    appId: "1:523171704328:web:c344e60f9a8e716e8eebbd",
    measurementId: "G-ZJJDPB2EFP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;