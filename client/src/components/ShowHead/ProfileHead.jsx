import "./ProfileHead.css";
import Loader from "../Loader/Loader";
import { forwardRef } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

const ProfileHead = forwardRef(
	({ className, fetchedUser, setRefreshFetchedUser, updateWidth }, ref) => {
		const { user, setUser } = useAdventures();
		const { setResInfos } = useAdventures();
		const profileCoverInputRef = useRef();

		const handleClick = () => {
			user &&
				user._id === fetchedUser._id &&
				profileCoverInputRef.current.click();
		};

		const handleChange = async (event) => {
			try {
				const file = event.target.files[0];
				const formData = new FormData();
				formData.append("cover", file);
				let result = await axios.patch(`/${user._id}/cover`, formData, {
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

		useEffect(() => {
			const handleResize = () => {
				updateWidth();
			};

			// Frissítés az oldal betöltésekor
			updateWidth();

			// ResizeObserver létrehozása
			const resizeObserver = new ResizeObserver(handleResize);

			// Figyeljük a konténer méretének változását
			if (ref.current) {
				resizeObserver.observe(ref.current);
			}

			// Eseményfigyelő eltávolítása a komponens unmountolásakor
			return () => {
				if (ref.current) {
					resizeObserver.unobserve(ref.current);
				}
			};
		}, [updateWidth, ref]);

		return (
			<header className="profile-head" ref={ref}>
				{fetchedUser ? (
					<>
						<img
							onClick={handleClick}
							className={className}
							src={fetchedUser.cover}
							alt="profile head thumbnail image"
						/>
						<h1>{fetchedUser.username}</h1>
						<input
							onChange={handleChange}
							ref={profileCoverInputRef}
							className="fake-cover-input"
							type="file"
							name="profile-head-cover-input"
							id="profile-head-cover-input"
						/>
					</>
				) : (
					<Loader className="loader-bigger" />
				)}
			</header>
		);
	}
);

ProfileHead.displayName = "ProfileHead";

export default ProfileHead;
