import OwnMenu from "../components/OwnMenu/OwnMenu";
import "./Own.css";
import Show from "./Show";
import { useAdventures } from "../contexts/useAdventures";
import { useEffect } from "react";

export default function Own() {
	const { selectedAdventure, setSelectedAdventure } = useAdventures();

	useEffect(() => {
		setSelectedAdventure(null);
	}, [setSelectedAdventure]);

	return (
		<main className="own-container">
			<OwnMenu />
			<Show className="show-head-rounded show-hiden" />
		</main>
	);
}
