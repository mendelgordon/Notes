import "./scss/styles.scss";
import { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { set, ref, onValue, remove, getDatabase, push, update } from "firebase/database";
import { auth } from "./config/firebase";
import { onAuthStateChanged, getRedirectResult, signInAnonymously } from "firebase/auth";
import { signInWithGoogle, signOutUser } from "./js/login";
import { ReactComponent as Trash } from "./trash.svg";

const database = getDatabase();

export const App = () => {
	const [notes, setNotes] = useState([]);
	const [user, setUser] = useState(auth.currentUser);
	const [isAnonymous, setIsAnonymous] = useState(false);

	useEffect(() => {
		getRedirectResult(auth)
			.then((result) => setUser(result?.user))
			.catch((error) => console.error(error));
		if (!user) {
			// Check if the user is not signed in
			const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
				if (currentUser) {
					// User is signed in, check if it's an anonymous or regular account
					setIsAnonymous(currentUser.isAnonymous);
					setUser(currentUser);
				} else {
					// User is not signed in, sign in anonymously
					signInAnonymously(auth)
						.then((userCredential) => {
							setUser(userCredential.user);
							setIsAnonymous(true);
						})
						.catch((error) => console.error(error));
				}
			});
			const notesRef = ref(database, `notes/${auth?.currentUser?.uid}`);
			onValue(notesRef, (snapshot) => {
				const notesData = snapshot.val();
				const notesArray = [];
				for (let id in notesData) {
					notesArray.push({ id, ...notesData[id] });
				}
				const sortedNotes = notesArray.sort((a, b) => b.timestamp - a.timestamp);
				setNotes(sortedNotes);
			});
			return () => unsubscribe();
		}
	}, [user]);

	const handleAddNote = () => {
		const newNoteRef = push(ref(database, `notes/${auth?.currentUser?.uid}/`));
		set(newNoteRef, {
			content: "New note",
			timestamp: Date.now(),
		});
	};

	const handleNoteChange = (event, id) => {
		const noteRef = ref(database, `notes/${auth?.currentUser?.uid}/${id}`);
		update(noteRef, {
			content: event.target.value,
		});
		const updatedNotes = notes.map((note) => {
			if (note.id === id) {
				return { ...note, content: event.target.value };
			}
			return note;
		});
		setNotes(updatedNotes);
	};

	const handleNoteDelete = (id) => {
		const user = auth.currentUser;
		if (user) {
			const noteRef = ref(database, `notes/${user.uid}/${id}`);
			remove(noteRef);
			const updatedNotes = notes.filter((note) => note.id !== id);
			setNotes(updatedNotes);
		} else {
			console.error("User is not authenticated");
		}
	};

	return (
		<>
			<nav className="navbar bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						<img src="../favicon_io/favicon-32x32.png" alt="Logo" width="24" height="24" className="d-inline-block align-text-top" />
						<span className="ms-2">Notes</span>
					</a>
					<div className="d-flex">
						<button className="btn btn-primary me-2" onClick={handleAddNote}>
							Add Note
						</button>
						{auth.currentUser && !isAnonymous ? (
							<button className="btn btn-primary" onClick={signOutUser}>
								Sign out
							</button>
						) : (
							<button className="btn btn-primary" onClick={signInWithGoogle}>
								Sign in with Google
							</button>
						)}
					</div>
				</div>
			</nav>
			<main className="container">
				<div className="vstack gap-3 mt-3">
					{notes.map(({ id, content }) => (
						<div className="col gy-2" key={id}>
							<div className="position-relative">
								<TextareaAutosize className="form-control form-control-lg" value={content} onChange={(e) => handleNoteChange(e, id)} />
								<button className="btn position-absolute top-0 end-0" onClick={() => handleNoteDelete(id)}>
									<Trash alt="Delete note" />
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</>
	);
};
