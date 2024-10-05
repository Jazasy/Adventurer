import "./FileInput.css";
import React from "react";
import "./TextInput.css";

export default function FileInput({file, handleChange, deleteFile, name}) {

	const fileInputRef = React.useRef();

	const clickFileInput = () => {
		fileInputRef.current.click();
		fileInputRef.current.value = null;
	};

	return (
		<div className="file-input">
			{file ? (
				<div className="input fake-file-input">
					<div className="file-preview">
						<img
							className="file-input-img"
							src={URL.createObjectURL(file)}
							alt="picture"
						/>
						<i
							className="fa-solid fa-circle-xmark post-file-x"
							onClick={deleteFile}
						></i>
					</div>
				</div>
			) : (
				<div className="input fake-file-input" onClick={clickFileInput}>
					<i className="fa-regular fa-image post-image-icon"></i>
				</div>
			)}

			<input
				onChange={handleChange}
				type="file"
				className="hiden-file-input"
				ref={fileInputRef}
				name={name}
			/>
		</div>
	);
}
