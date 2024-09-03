import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Show from "./pages/Show";
import Navbar from "./components/Navbar/Navbar";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export default function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/adventures/:id" element={<Show />} />
			</Routes>
		</>
	);
}
