import OwnMenu from "../components/OwnMenu/OwnMenu";
import "./Own.css";
import Show from "./Show";
import { useAdventures } from "../contexts/useAdventures";
import { useEffect } from "react";
import Profile from "./Profile";

export default function Own() {
	const { selectedAdventure, setSelectedAdventure } = useAdventures();
	const { setApplicationsByAdventure } = useAdventures();
	const { setAdventurersByAdventure } = useAdventures();

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
				<Show className="show-head-rounded show-hiden show-own" />
			) : (
				<Profile className="profile-hiden"/>
			)}
		</main>
	);
}
