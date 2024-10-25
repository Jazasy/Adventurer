import "./ProfileHead.css";
import Loader from "../Loader/Loader";
import { forwardRef } from "react";
import { useEffect } from "react";

const ProfileHead = forwardRef(
	({ className, fetchedUser, updateWidth }, ref) => {
		useEffect(() => {
			updateWidth();
			/*  window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth); */
		}, [updateWidth]);

		return (
			<header className="profile-head" ref={ref}>
				{fetchedUser ? (
					<>
						<img
							className={className}
							src={fetchedUser.pfp}
							alt="profile head thumbnail image"
						/>
						<h1>{fetchedUser.username}</h1>
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
