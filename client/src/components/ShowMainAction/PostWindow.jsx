import "./PostWindow.css";
import TextArea from "../inputs/TextArea";
import XButton from "../Buttons/XButton";
import Button1 from "../Buttons/Button1";
import FileInput from "../inputs/FileInput";
import { useState } from "react";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

export default function PostWindow({ closeShowPostWindow, adventureId }) {
	const [post, setPost] = useState({ content: "", image: null }); // it is important to call the file image here becase multer will use this keyname
	const [posted, setPosted] = useState(false);
	const { setResInfos } = useAdventures();
	const { user } = useAdventures();

	const handleChange = (event) => {
		const { name } = event.target;
		if (name === "image") {
			setPost((oldPosts) => {
				return {
					...oldPosts,
					[name]: event.target.files[0],
				};
			});
		} else if (name === "content") {
			setPost((oldPosts) => {
				return {
					...oldPosts,
					[name]: event.target.value,
				};
			});
		}
	};

	const deleteImageFile = () => {
		setPost((oldPost) => {
			return {
				...oldPost,
				image: null,
			};
		});
	};

	const submitPost = async (event) => {
		event.preventDefault();
		if (!posted) {
			try {
				setPosted(true);
				const formData = new FormData();
				for (const key in post) {
					formData.append(key, post[key]);
				}
				formData.append("userId", user._id);
				await axios.post(`/posts/${adventureId}`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				setPost({ content: "", image: null });
				closeShowPostWindow();
			} catch (error) {
				setPosted(false);
				error.response.data.message
					? resInfoError(error.response.data.message, setResInfos)
					: resInfoError("Something went wrong", setResInfos);
			}
		}
	};

	return (
		<form className="post-window-container" onSubmit={submitPost}>
			<div className="post-window">
				<XButton action={closeShowPostWindow} />
				<TextArea
					rows={5}
					handleChange={handleChange}
					value={post.content}
					name="content"
					placeholder="Put your experiences into words!"
				/>
				<FileInput
					file={post.image}
					handleChange={handleChange}
					deleteFile={deleteImageFile}
					name="image"
				/>
				<Button1
					text="Post"
					className={`btn-fit-content btn-big post-submit-button ${
						posted ? "btn-muted" : ""
					}`}
					action={posted ? null : submitPost}
				/>
				<button className="fake-submit-button">fake submit</button>
			</div>
		</form>
	);
}
