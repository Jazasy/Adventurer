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
import PfpInput from "../inputs/PfpInput";

export default function RegisterForm() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		verifyPassword: "",
		pfp: "",
	});
	const { setResInfos } = useAdventures();
	const { setUser } = useAdventures();
	const [submitted, setSubmitted] = useState(false);

	const navigate = useNavigate();

	const handleChange = (event) => {
		setFormData((oldFormData) => {
			return {
				...oldFormData,
				[event.target.name]:
					event.target.type === "file"
						? event.target.files[0]
						: event.target.value,
			};
		});
	};

	const handleSubmit = async (event) => {
		if (!submitted) {
			try {
				event.preventDefault();
				setSubmitted(true);

				const submitFormData = new FormData();
				for (const key in formData) {
					submitFormData.append(key, formData[key]);
				}

				const result = await axios.post("/register", submitFormData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				setSubmitted(false);
				result.data.message && resInfoError(result.data.message, setResInfos);

				loginUser(formData, setResInfos, navigate, setUser);
			} catch (error) {
				resInfoError(error.response.data.message, setResInfos);
				setSubmitted(false);
			}
		}
	};

	return (
		<form className="register-form" onSubmit={handleSubmit}>
			<h1 className="title2">Create your Account</h1>
			<PfpInput
				className="register-pfp-input"
				handleChange={handleChange}
				file={formData.pfp}
			/>
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
			<button className="reg-fake-button" type="submit">
				submit
			</button>
			<Button1
				className={`register-button btn-fit-content btn-big ${
					submitted && "btn-muted"
				}`}
				text="Sign up"
				action={handleSubmit}
			/>
		</form>
	);
}
