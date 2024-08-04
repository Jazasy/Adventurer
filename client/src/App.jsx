import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	);
}
