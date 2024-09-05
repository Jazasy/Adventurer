import "./LoginForm.css";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
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
            console.log(result.data);
		} catch (error) {
			if(error.response.data){
                console.log(error.response.data.error);
            }
		}
	};
	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<input
				type="text"
				value={formData.username}
				onChange={handleChange}
				name="username_email"
			/>
			<input
				type="password"
				value={formData.password}
				onChange={handleChange}
				name="password"
			/>
			<button>Login</button>
		</form>
	);
}
