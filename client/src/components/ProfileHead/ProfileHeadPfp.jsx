import "./ProfileHeadPfp.css";
import { useRef } from "react";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import Loader from "../Loader/Loader";

export default function ProfileHeadPfp({ fetchedUser, setRefreshFetchedUser }) {
	const { user, setUser } = useAdventures();
	const { setResInfos } = useAdventures();
	const profilePfpInputRef = useRef();

	const handleClick = () => {
		user && user._id === fetchedUser._id && profilePfpInputRef.current.click();
	};

	const handleChange = async (event) => {
		try {
			const file = event.target.files[0];
			const formData = new FormData();
			formData.append("pfp", file);
			let result = await axios.patch(`/${user._id}/pfp`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			result.data.message && resInfoError(result.data.message, setResInfos);

			result = axios.get("/user");
			result && setUser(result.data);
			setRefreshFetchedUser((prev) => !prev);
			//window.location.reload();
		} catch (error) {
			if (error.response.data.message) {
				resInfoError(error.response.data.message, setResInfos);
			} else {
				resInfoError("Something went wrong", setResInfos);
			}
		}
	};

	return (
		<div className="profile-head-pfp" onClick={handleClick}>
			<img
				className="profile-page-pfp"
				src={fetchedUser.pfp}
				alt="profile picture"
			/>
			{/* <i className="fa-solid fa-pencil pfp-pencil-icon"></i> */}
			<input
				onChange={handleChange}
				ref={profilePfpInputRef}
				className="fake-pfp-input"
				type="file"
				name="profile-head-pfp-input"
				id="profile-head-pfp-input"
			/>
		</div>
	);
}
