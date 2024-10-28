import PostBoard from "../components/PostBoard/PostBoard";
import { useAdventures } from "../contexts/useAdventures";
import { useParams } from "react-router-dom";
import "./Profile.css";
import ProfileHead from "../components/ShowHead/ProfileHead";
import Loader from "../components/Loader/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import { resInfoError } from "../components/ResponseInfo/resInfoHelpers";
import { useRef } from "react";
import ProfileHeadPfp from "../components/ProfileHead/ProfileHeadPfp";

export default function Profile({ className }) {
	const { user } = useAdventures();
	const { id } = useParams();
	const { setResInfos } = useAdventures();
	const [fetchedUser, setFetchedUser] = useState(null);
	const [refreshFetchedUser, setRefreshFetchedUser] = useState(false);

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
	}, [userId, setResInfos, refreshFetchedUser]);

	const profileContainerRef = useRef(null);
	const profileHeadRef = useRef(null);

	const updateProfileHeadWidth = () => {
		if (profileHeadRef.current && profileContainerRef.current) {
			const newWidth = `${profileContainerRef.current.offsetWidth}px`;
			profileHeadRef.current.style.width = newWidth;
		}
	};

	useEffect(() => {
		const handleResize = () => {
			updateProfileHeadWidth();
		};

		// ResizeObserver létrehozása
		const resizeObserver = new ResizeObserver(handleResize);

		// Figyeljük a konténer méretének változását
		if (profileContainerRef.current) {
			resizeObserver.observe(profileContainerRef.current);
		}

		// Window resize esemény figyelése
		window.addEventListener("resize", handleResize);

		// Frissítés az oldal betöltésekor
		handleResize();

		// Eseményfigyelők eltávolítása a komponens unmountolásakor
		return () => {
			if (profileContainerRef.current) {
				resizeObserver.unobserve(profileContainerRef.current);
			}
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			{fetchedUser ? (
				<div
					className={`profile-container ${className}`}
					ref={profileContainerRef}
				>
					<ProfileHead
						className={className}
						fetchedUser={fetchedUser}
						setRefreshFetchedUser={setRefreshFetchedUser}
						ref={profileHeadRef}
						updateWidth={updateProfileHeadWidth}
					/>
					<section className="profile-main-wrapper">
						<main className="profile-main">
							<ProfileHeadPfp
								fetchedUser={fetchedUser}
								setRefreshFetchedUser={setRefreshFetchedUser}
							/>
							<PostBoard userId={fetchedUser._id} />
						</main>
					</section>
				</div>
			) : (
				<Loader className="loader-bigger" />
			)}
		</>
	);
}
