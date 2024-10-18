import "./OwnMenuOwnPage.css";
import "./OwnMenuItem.css";
import { useAdventures } from "../../contexts/useAdventures";
import { useNavigate } from "react-router-dom";

export default function OwnMenuOwnPage() {
	const { user } = useAdventures();
	const { setSelectedAdventure } = useAdventures();

	const navigate = useNavigate();

	const openProfile = () => {
		if (window.innerWidth < 1000) {
			navigate(`/profiles/${user._id}`);
		}
		setSelectedAdventure(null);
	};

	return (
		<div className="own-menu-item">
			<p onClick={openProfile}>{user.username}</p>
			<div className="own-menu-actions">
				<img
					onClick={openProfile}
					className="own-menu-pfp"
					src={user.pfp}
					alt="profile picture"
				/>
				{/* <i className="fa-solid fa-pager own-menu-page-icon"></i> */}
			</div>
		</div>
	);
}
