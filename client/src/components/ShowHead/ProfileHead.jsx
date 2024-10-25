import "./ProfileHead.css";
import Loader from "../Loader/Loader";

export default function ProfileHead({className, fetchedUser }) {
	return (
		<header className="profile-head">
			{fetchedUser ? (
                <>
                    <img className={className} src={fetchedUser.pfp} alt="profile head thumbnail image" />
                    <h1>{fetchedUser.username}</h1>
                </>
            ): <Loader className="loader-bigger"/>}
		</header>
	);
}
