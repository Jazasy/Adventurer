import Button1 from "../Buttons/Button1";
import FileInput from "../inputs/FileInput";
import TextArea from "../inputs/TextArea";
import TextInput from "../inputs/TextInput";
import "./CreateForm.css";
import { useState } from "react";
import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import { useAdventures } from "../../contexts/useAdventures";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
	const { setResInfos } = useAdventures();
	const { user } = useAdventures();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		image: null,
	});
	const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

	const handleChange = (event) => {
		setFormData((oldFormData) => {
			return {
				...oldFormData,
				[event.target.name]:
					event.target.name === "image"
						? event.target.files[0]
						: event.target.value,
			};
		});
	};

	const deleteImageFile = () => {
		setFormData((oldFormData) => {
			return {
				...oldFormData,
				image: null,
			};
		});
	};

	const handleSubmit = async (event) => {
        event.preventDefault();
		if (!submitted) {
			try {
				setSubmitted(true);
				const result =await axios.post(
					"/adventures",
					{ userId: user._id, ...formData },
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);
                resInfoError(result.data.message, setResInfos);
                setFormData({ title: "", description: "", image: null });
                setSubmitted(false);
                navigate("/home");
			} catch (error) {
				if (error.response.data.message) {
					resInfoError(error.response.data.message, setResInfos);
				}
                setFormData({ title: "", description: "", image: null });
                setSubmitted(false);
			}
		}
	};

	return (
		<form className="create-form" onSubmit={handleSubmit}>
			<h1 className="title2">Create your own Adventure!</h1>
			<TextInput
				handleChange={handleChange}
				value={formData.title}
				placeholder="title"
				name="title"
			/>
			<TextArea
				handleChange={handleChange}
				value={formData.description}
				placeholder="description"
				name="description"
                rows={20}
			/>
			<FileInput
				handleChange={handleChange}
				deleteFile={deleteImageFile}
				file={formData.image}
				name="image"
			/>
			<Button1
				action={handleSubmit}
				className={`btn-fit-content btn-big create-button ${
					submitted ? "btn-muted" : ""
				}`}
				text="Create"
			/>
			<button className="fake-create-submit-button">fake submit buton</button>
		</form>
	);
}
