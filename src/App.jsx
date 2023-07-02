import "./scss/styles.scss";
// import * as bootstrap from "bootstrap";
import { Auth } from "./auth/auth";

export const App = () => {
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
				<div className="row">
					<div className="col gy-2">
						<textarea className="form-control form-control-lg form-control-plaintext" id="note" rows="10" placeholder="Write your note here..."></textarea>
					</div>
				</div>
			</main>
		</>
	);
};
