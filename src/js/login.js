import { signInWithRedirect, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase";

export const signInWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	signInWithRedirect(auth, provider).catch((error) => console.error(error));
};

export const signOutUser = () => {
	signOut(auth).catch((error) => console.error(error));
};
