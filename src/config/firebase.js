import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAv0Ym6pqkZDfM2BTjXDgGOz6VVlJV3djs",
  authDomain: "notes-70da2.firebaseapp.com",
  projectId: "notes-70da2",
  storageBucket: "notes-70da2.appspot.com",
  messagingSenderId: "831679024451",
  appId: "1:831679024451:web:cadacc4a0dfedbc04db3f6",
  database: "https://notes-70da2-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };