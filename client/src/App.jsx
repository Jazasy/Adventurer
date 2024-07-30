import axios from "axios";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css"

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export default function App() {
	const [testData, setTestData] = useState();
	useEffect(() => {
		axios.get("/test").then((response) => setTestData(response.data));
	}, []);
	return (
		<>
			<CssBaseline />
			<div className = "container">
                <header className="head"></header>
                <main className="main"></main>
                <footer className="foot"></footer>
            </div>
		</>
	);
}
