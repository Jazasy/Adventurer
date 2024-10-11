import "./OwnMenuOwnAdventure.css";
import "./OwnMenuItem.css";
import { useAdventures } from "../../contexts/useAdventures";
import { useNavigate } from "react-router-dom";

export default function OwnMenuOwnAdventure({ adventure }) {
    const { setSelectedAdventure } = useAdventures();

	const navigate = useNavigate();

    const openAdventure = () => {
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
