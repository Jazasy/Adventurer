import OwnMenu from "../components/OwnMenu/OwnMenu";
import "./Own.css";
import Show from "./Show";
import { useAdventures } from "../contexts/useAdventures";
import { useEffect } from "react";
import Profile from "./Profile";
import Message from "./Message";

export default function Own() {
	const { selectedAdventure, setSelectedAdventure } = useAdventures();
	const { setApplicationsByAdventure } = useAdventures();
	const { setAdventurersByAdventure } = useAdventures();
	const { showMessages } = useAdventures();

	useEffect(() => {
		setSelectedAdventure(null);
	}, [
		setSelectedAdventure,
		setApplicationsByAdventure,
		setAdventurersByAdventure,
	]);

	return (
		<main className="own-container">
			<OwnMenu />
			{selectedAdventure ? (
				showMessages ? (
					<Message className="message-hiden" adventureId={selectedAdventure._id} />
				) : (
					<Show className="show-head-rounded show-hiden show-own" />
				)
			) : (
				<Profile className="profile-hiden profile-head-rounded" />
			)}
		</main>
	);
}
