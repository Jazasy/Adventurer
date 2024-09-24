import "./RegisterForm.css";
import TextInput from "../inputs/TextInput";
import PassInput from "../inputs/PassInput";
import Button1 from "../Buttons/Button1";
import { useState } from "react";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import { passCheck, passStrength } from "./registerHelpers";
import { loginUser } from "../LoginCard/loginHelpers";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		verifyPassword: "",
	});
	const { setResInfos } = useAdventures();
	const { setUser } = useAdventures();

	const navigate = useNavigate();

	const handleChange = (event) => {
		setFormData((oldFormData) => {
			return { ...oldFormData, [event.target.name]: event.target.value };
		});
	};

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();

			await axios.post("/register", {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});

			setResInfos((oldResInfos) => [
				...oldResInfos,
				"Your account has been created!",
			]);

			loginUser(formData, setResInfos, navigate, setUser);
		} catch (error) {
			resInfoError(error.response.data.message, setResInfos);
		}
	};

	return (
		<form className="register-form" onSubmit={handleSubmit}>
			<TextInput
				className="mb-1"
				value={formData.username}
				handleChange={handleChange}
				placeholder="Username"
				name="username"
			/>
			<TextInput
				className="mb-1"
				value={formData.email}
				handleChange={handleChange}
				placeholder="Email address"
				name="email"
			/>
			<section className="passwords">
				<PassInput
					value={formData.password}
					className={
						formData.password.length === 0
							? ""
							: passStrength(formData.password)
					}
					handleChange={handleChange}
					placeholder="Password"
					name="password"
				/>
				<PassInput
					value={formData.verifyPassword}
					className={
						passCheck(formData.password, formData.verifyPassword)
							? "pass-check"
							: ""
					}
					handleChange={handleChange}
					placeholder="Password"
					name="verifyPassword"
				/>
			</section>
			<button className="reg-fake-button" type="submit">
				submit
			</button>
			<Button1
				className="register-button btn-fit-content btn-big"
				text="Sign up"
				action={handleSubmit}
			/>
		</form>
	);
}
