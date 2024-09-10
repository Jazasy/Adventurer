import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Show from "./pages/Show";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResponseInfoContainer from "./components/ResponseInfo/ResponseInfoContainer";
import Profile from "./pages/Profile";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if( token ) {
			config.headers.authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
)

export default function App() {
	return (
		<>
			<ResponseInfoContainer />
			<Navbar />
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/adventures/:id" element={<Show />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</>
	);
}
