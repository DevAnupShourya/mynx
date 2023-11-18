import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    // TODO : USe Env. Values   
    apiKey: "AIzaSyA3clvKhXrHW_QzIui21mS83Tmej3YCNzg",
    authDomain: "vixel-399913.firebaseapp.com",
    projectId: "vixel-399913",
    storageBucket: "vixel-399913.appspot.com",
    messagingSenderId: "889919909856",
    appId: "1:889919909856:web:7d3e18fd5b577aff178585",
    measurementId: "G-1V9JR2HZD2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth as default, provider }