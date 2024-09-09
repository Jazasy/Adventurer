import "./LoginForm.css";
import { useState } from "react";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import Button1 from "../Buttons/Button1";
import TextInput from "../Inputs/TextInput";
import PassInput from "../Inputs/PassInput";

export default function LoginForm() {
	const { resInfos, setResInfos } = useAdventures(null);
	const [formData, setFormData] = useState({
		username_email: "",
		password: "",
	});

	const handleChange = (event) => {
		setFormData((oldFormData) => {
			return { ...oldFormData, [event.target.name]: event.target.value };
		});
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

			/* const accessToken = result.data.accessToken;
			localStorage.setItem("accessToken", accessToken);

			console.log(localStorage.getItem("accessToken")); */

			setResInfos((oldResInfos) => [
				...oldResInfos,
				"You've successfully logged in!",
			]);

			setFormData({ username_email: "", password: "" });
		} catch (error) {
			if (error.response.data) {
				setResInfos((oldResInfos) => [
					...oldResInfos,
					error.response.data.error,
				]);
			}
		}
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
