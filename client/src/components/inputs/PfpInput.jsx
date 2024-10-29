import { useRef } from "react";
import "./PfpInput.css";

export default function PfpInput({ handleChange, file }) {
	const pfpInputRef = useRef();

	const clickPfpInput = () => {
		pfpInputRef.current.click();
	};

	return (
		<div className="pfp-input" onClick={clickPfpInput}>
			<img
				className="pfp-image"
				src={
					file
						? URL.createObjectURL(file)
						: "https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179548/Adventurer/seed/uiwuefdckhu8spiqb4pa.jpg"
				}
				alt="profile picture"
			/>
			<i className="fa-solid fa-pencil pfp-pencil-icon"></i>
			<input
				onChange={handleChange}
				ref={pfpInputRef}
				className="fake-pfp-input"
				type="file"
				name="pfp"
				id="pfp"
			/>
		</div>
	);
}
