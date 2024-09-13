import "./RegisterForm.css";
import TextInput from "../inputs/TextInput";
import PassInput from "../inputs/PassInput";
import Button1 from "../Buttons/Button1";
import { useState } from "react";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import { passCheck, passStrength } from "./registerHelpers";

export default function RegisterForm() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		verifyPassword: "",
	});
	const { setResInfos } = useAdventures();

	const handleChange = (event) => {
		setFormData((oldFormData) => {
			return { ...oldFormData, [event.target.name]: event.target.value };
		});
	};

	const handleSubmit = async () => {
		try {	
			await axios.post("/register", {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});
		} catch (error) {
			resInfoError(error.response.data.message, setResInfos);
		}
	};

	return (
		<form className="register-form">
			<TextInput
				value={formData.username}
				handleChange={handleChange}
				placeholder="Username"
				name="username"
			/>
			<TextInput
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
			<Button1
				className="login-button btn-fit-content btn-big"
				text="Sign up"
				action={handleSubmit}
			/>
		</form>
	);
}
