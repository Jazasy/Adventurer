import PostBoard from "../components/PostBoard/PostBoard";
import { useAdventures } from "../contexts/useAdventures";
import { useParams } from "react-router-dom";
import "./Profile.css";
import ProfileHead from "../components/ShowHead/ProfileHead";
import Loader from "../components/Loader/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import { resInfoError } from "../components/ResponseInfo/resInfoHelpers";

export default function Profile({ className }) {
	const { user } = useAdventures();
	const { id } = useParams();
	const { setResInfos } = useAdventures();
	const [fetchedUser, setFetchedUser] = useState(null);

	const userId = id || (user && user._id) || null;

	useEffect(() => {
		userId &&
			axios
				.get(`/users/${userId}`)
				.then((res) => setFetchedUser(res.data))
				.catch((error) => {
					error.response.data.message &&
						resInfoError(error.response.data.message, setResInfos);
				});
	}, [userId, setResInfos]);

	return (
		<>
			{fetchedUser ? (
				<div className={`profile ${className}`}>
					<ProfileHead className={className} fetchedUser={fetchedUser} />
					<div className="profile-main">
						<img className="profile-page-pfp" src={fetchedUser.pfp} alt="profile picture" />
						<PostBoard userId={fetchedUser._id} />
					</div>
				</div>
			) : (
				<Loader className="loader-bigger" />
			)}
		</>
	);
}
