import "./OwnMenuOwnAdventure.css";
import "./OwnMenuItem.css";
import { useAdventures } from "../../contexts/useAdventures";

export default function OwnMenuOwnAdventure({ adventure }) {
    const { setSelectedAdventure } = useAdventures();

    const openAdventure = () => {
        setSelectedAdventure(adventure);
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
