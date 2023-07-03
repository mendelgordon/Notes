import "./scss/styles.scss";
// import * as bootstrap from "bootstrap";
import { Auth } from "./auth/auth";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import TextareaAutosize from "react-textarea-autosize";

const generateId = () => Math.floor(Math.random() * 1000000);

export const App = () => {
	const [notes, setNotes] = useState([
		{ id: generateId(), content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatumLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatumLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatumLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum." },
		{ id: generateId(), content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum." },
	]);
	const handleNoteChange = (event, id) => {
		const updatedNotes = notes.map((note) => {
			if (note.id === id) {
				return { ...note, content: event.target.value };
			}
			return note;
		});
		setNotes(updatedNotes);
	};
	const handleAddNote = () => {
		const newNote = { id: generateId(), content: "" };
		setNotes([...notes, newNote]);
	};
	const handleDeleteNote = (id) => {
		const updatedNotes = notes.filter((note) => note.id !== id);
		setNotes(updatedNotes);
	};

	return (
		<>
			<nav className="navbar bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						<img src="../favicon_io/favicon-32x32.png" alt="Logo" width="24" height="24" className="d-inline-block align-text-top" />
						<span className="ms-2">Notes</span>
					</a>
					<Auth />
				</div>
			</nav>
			<main className="container">
				<div className="vstack gap-3 mt-3">
					{notes.map(({ id, content }) => (
						<div className="col gy-2" key={id}>
							<div className="position-relative">
								<TextareaAutosize
									className="form-control form-control-lg"
									value={content}
									onChange={(e) => handleNoteChange(e, id)}
								/>
								<button className="btn position-absolute top-0 end-0" onClick={() => handleDeleteNote(id)}>
									<i className="bi bi-trash"></i>
								</button>
							</div>
						</div>
					))}
					<div className="add-note">
						<button className="btn btn-primary" onClick={handleAddNote}>
							Add Note
						</button>
					</div>
				</div>
			</main>
		</>
	);
};
