import { Client } from "appwrite";
const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("649cedbded595779b96e");

export const App = () => {
	return (
		<div>
			<h1>Notes</h1>
		</div>
	);
};
