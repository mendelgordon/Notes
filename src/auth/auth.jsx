import { useEffect } from "react";
import { onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
	signInWithRedirect(auth, provider)
		.then(() => {
			// Redirected successfully
		})
		.catch((error) => {
			console.error(error);
		});
};

const signOutUser = () => {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
		})
		.catch((error) => {
			console.error(error);
		});
};

export const Auth = () => {
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log("User is signed in:");
				console.log(user);
			} else {
				console.log("User is not signed in");
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div>
			{auth.currentUser ? (
				<button className="btn btn-primary" onClick={signOutUser}>
					Sign out
				</button>
			) : (
				<button className="btn btn-primary" onClick={signInWithGoogle}>
					Sign in with Google
				</button>
			)}
		</div>
	);
};
