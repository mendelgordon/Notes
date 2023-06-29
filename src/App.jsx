// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv0Ym6pqkZDfM2BTjXDgGOz6VVlJV3djs",
  authDomain: "notes-70da2.firebaseapp.com",
  projectId: "notes-70da2",
  storageBucket: "notes-70da2.appspot.com",
  messagingSenderId: "831679024451",
  appId: "1:831679024451:web:cadacc4a0dfedbc04db3f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const App = () => {
	return (
		<div>
			<h1>Notes</h1>
		</div>
	);
};
