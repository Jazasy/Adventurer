import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Show from "./pages/Show";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Create from "./pages/Create";
import ResponseInfoContainer from "./components/ResponseInfo/ResponseInfoContainer";
import Profile from "./pages/Profile";
import { useAdventures } from "./contexts/useAdventures";
import { useEffect } from "react";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.data.message === "invalid accesstoken" &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			try {
				const response = await axios.post("/token");
				const newAccessToken = response.data.accessToken;
				localStorage.setItem("accessToken", newAccessToken);
				return await axios(originalRequest);
			} catch (tokenError) {
				return Promise.reject(tokenError);
			}
		}
		return Promise.reject(error);
	}
);

export default function App() {
	const {user, setUser} = useAdventures();

	useEffect(() => {
		if(!user) {
			axios.get("user")
				.then(res => setUser(res.data))
				.catch(err => console.error(err));
		}
	}, [user, setUser]);

	return (
		<>
			<ResponseInfoContainer />
			<Navbar />
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/adventures/:id" element={<Show />} />
				<Route path="/adventures/create" element={<Create />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profiles/:id" element={<Profile />} />
			</Routes>
		</>
	);
}
