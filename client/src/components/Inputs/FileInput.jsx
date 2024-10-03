import "./FileInput.css";
import React, { useState } from "react";
import "./TextInput.css";

export default function FileInput() {
	const [file, setFile] = useState();

	const fileInputRef = React.useRef();

	const clickFileInput = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0]; //const selectedFiles = Array.from(event.target.files);
		setFile(file);
		console.log(file);
	};

	return (
		<div className="file-input">
			<div className="input fake-file-input" onClick={clickFileInput}>
				{file ? (
					<img className="file-input-img" src={URL.createObjectURL(file)} alt="picture" />
				) : (
					<i className="fa-regular fa-image post-image-icon"></i>
				)}
			</div>
			<input
				onChange={handleFileChange}
				type="file"
				className="hiden-file-input"
				ref={fileInputRef}
			/>
		</div>
	);
}
