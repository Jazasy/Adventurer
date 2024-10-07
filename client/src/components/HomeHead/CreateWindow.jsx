import "./CreateWindow.css";
import TextArea from "../inputs/TextArea";
import XButton from "../Buttons/XButton";
import Button1 from "../Buttons/Button1";
import FileInput from "../inputs/FileInput";
import { useState } from "react";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

export default function CreateWindow({ closeCreateWindow, adventureId }) {
	const [adv, setAdv] = useState({ content: "", image: null }); // it is important to call the file image here becase multer will use this keyname
	const [created, setCreated] = useState(false);
	const { setResInfos } = useAdventures();
	const { user } = useAdventures();

	const handleChange = (event) => {
		const { name } = event.target;
		if (name === "image") {
			setAdv((oldAdv) => {
				return {
					...oldAdv,
					[name]: event.target.files[0],
				};
			});
		} else if (name === "content") {
			setAdv((oldAdv) => {
				return {
					...oldAdv,
					[name]: event.target.value,
				};
			});
		}
	};

	const deleteImageFile = () => {
		setAdv((oldAdv) => {
			return {
				...oldAdv,
				image: null,
			};
		});
	};

	const submitAdv = async (event) => {
		event.preventDefault();
		try {
			setCreated(true);
			const formData = new FormData();
			for (const key in adv) {
				formData.append(key, adv[key]);
			}
			formData.append("userId", user._id);
			await axios.post(`/posts/${adventureId}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setAdv({ content: "", image: null });
			closeCreateWindow();
		} catch (error) {
			setCreated(false);
			error.response.data.message
				? resInfoError(error.response.data.message, setResInfos)
				: resInfoError("Something went wrong", setResInfos);
		}
	};

	return (
		<form className="post-window-container" onSubmit={submitAdv}>
			<div className="post-window">
				<XButton action={closeCreateWindow} />
				<TextArea
					rows={5}
					handleChange={handleChange}
					value={adv.content}
					name="content"
					placeholder="Put your experiences into words!"
				/>
				<FileInput
					file={adv.image}
					handleChange={handleChange}
					deleteFile={deleteImageFile}
					name="image"
				/>
				<Button1
					text="Post"
					className={`btn-fit-content btn-big post-submit-button ${created ? "btn-muted" : ""}`}
					action={created ? null : submitAdv}
				/>
				<button className="fake-submit-button">fake submit</button>
			</div>
		</form>
	);
}
