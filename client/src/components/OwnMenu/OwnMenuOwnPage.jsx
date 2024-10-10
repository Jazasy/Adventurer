import "./OwnMenuOwnPage.css";
import "./OwnMenuItem.css";
import { useAdventures } from "../../contexts/useAdventures";

export default function OwnMenuOwnPage() {
	const { user } = useAdventures();

	return (
		<div className="own-menu-item">
			<p>{user.username}</p>
			<div className="own-menu-actions">
				<img className="own-menu-pfp" src={user.pfp} alt="profile picture" />
				{/* <i className="fa-solid fa-pager own-menu-page-icon"></i> */}
			</div>
		</div>
	);
}
