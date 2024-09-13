import "./LoginForm.css";
import { useState } from "react";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import Button1 from "../Buttons/Button1";
import TextInput from "../inputs/TextInput";
import PassInput from "../inputs/PassInput";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
	const { setResInfos } = useAdventures(null);
	const { setUser } = useAdventures(null);
	const [formData, setFormData] = useState({
		username_email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (event) => {
		setFormData((oldFormData) => {
			return { ...oldFormData, [event.target.name]: event.target.value };
		});
	};

	const getUser = async () => {
		try {
			const fetchedUser = await axios.get("/user");
			setUser(fetchedUser.data);
		} catch (error) {
			resInfoError(error.response.data.message, setResInfos);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const loginKeyType = formData.username_email.includes("@")
			? "email"
			: "username";

		try {
			const result = await axios.post("/login", {
				[loginKeyType]: formData.username_email,
				password: formData.password,
			});

			const accessToken = result.data.accessToken;
			if (accessToken) {
				localStorage.setItem("accessToken", accessToken);
				setResInfos((oldResInfos) => [
					...oldResInfos,
					"You've successfully logged in!",
				]);
				getUser();
				navigate("/home");
			}
		} catch (error) {
			resInfoError(error.response.data.message, setResInfos);
		}

		setFormData({ username_email: "", password: "" });
	};

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<TextInput
				value={formData.username_email}
				handleChange={handleChange}
				name="username_email"
				placeholder="Username or Email"
			/>
			<PassInput
				value={formData.password}
				handleChange={handleChange}
				name="password"
				placeholder="Password"
			/>
			<button className="fake-button" type="submit">
				submit
			</button>
			<Button1
				className="login-button btn-fit-content btn-big"
				text="Log in"
				action={handleSubmit}
			/>
		</form>
	);
}
