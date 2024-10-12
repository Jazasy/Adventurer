import "./OwnMenuOwnAdventure.css";
import "./OwnMenuItem.css";
import { useAdventures } from "../../contexts/useAdventures";
import { useNavigate } from "react-router-dom";

export default function OwnMenuOwnAdventure({ adventure }) {
    const { setSelectedAdventure } = useAdventures();
	const { setApplicationsByAdventure } = useAdventures();
	const { setAdventurersByAdventure } = useAdventures();

	const navigate = useNavigate();

    const openAdventure = () => {
		//The following two line are necessary to avoid a bug where the applications and adventurers of the previous adventure are shown
		setApplicationsByAdventure(null);
		setAdventurersByAdventure(null);
		setSelectedAdventure(null);
        setSelectedAdventure(adventure);
		if(window.innerWidth < 1000) {
			navigate(`/adventures/${adventure._id}`);
		}
    }

	return (
		<div className="own-menu-item">
			<p>{adventure.title}</p>
			<div className="own-menu-actions">
				<i className="fa-regular fa-comments own-menu-chat-icon"></i>
				<i className="fa-solid fa-pager own-menu-page-icon" onClick={openAdventure}></i>
			</div>
		</div>
	);
}
