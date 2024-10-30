import "./OwnMenuItem.css";
import { useAdventures } from "../../contexts/useAdventures";
import { useNavigate } from "react-router-dom";

export default function OwnMenuItem({ adventure, accepted = false }) {
	const { selectedAdventure, setSelectedAdventure } = useAdventures();
	const { setApplicationsByAdventure } = useAdventures();
	const { setAdventurersByAdventure } = useAdventures();
	const { setShowMessages } = useAdventures();

	const navigate = useNavigate();

	const openAdventure = () => {
		if (selectedAdventure && selectedAdventure._id !== adventure._id) {
			//The following two line are necessary to avoid a bug where the applications and adventurers of the previous adventure are shown
			setApplicationsByAdventure(null);
			setAdventurersByAdventure(null);
		}

		setSelectedAdventure(adventure);
		setShowMessages(false);
		if (window.innerWidth < 1000) {
			navigate(`/adventures/${adventure._id}`);
		}
	};

	const openChat = () => {
		setSelectedAdventure(adventure);
		if (window.innerWidth < 1000) {
			navigate("/messages");
		} else {
			setShowMessages(true);
		}
	};

	return (
		<div className="own-menu-item">
			<p onClick={openAdventure}>{adventure.title}</p>
			<div className="own-menu-actions">
				{accepted ? (
					<i
						onClick={openChat}
						className="fa-regular fa-comments own-menu-chat-icon"
					></i>
				) : null}
				<i
					className="fa-solid fa-pager own-menu-page-icon"
					onClick={openAdventure}
				></i>
			</div>
		</div>
	);
}
