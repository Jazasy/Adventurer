import "./LoginForm.css";
import { useState } from "react";
import { useAdventures } from "../../contexts/useAdventures";
import Button1 from "../Buttons/Button1";
import TextInput from "../inputs/TextInput";
import PassInput from "../inputs/PassInput";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./loginHelpers";

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		loginUser(formData, setResInfos, navigate, setUser);
		setFormData({ username_email: "", password: "" }) 
	};

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<h1 className="title2">Login to your Account</h1>
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
			<button className="log-fake-button" type="submit">
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
