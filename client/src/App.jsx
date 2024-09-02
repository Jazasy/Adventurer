import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Show from "./pages/Show";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/adventures/:id" element={<Show />} />
			</Routes>
		</>
	);
}
