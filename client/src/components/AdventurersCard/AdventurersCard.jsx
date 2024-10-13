import "./AdventurersCard.css";
import axios from "axios";
import { useRef, useEffect } from "react";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import { useAdventures } from "../../contexts/useAdventures";
import Adventurer from "./Adventurer";
import XButton from "../Buttons/XButton";

export default function AdventurersCard() {
	const { setResInfos } = useAdventures();
	const { selectedAdventure } = useAdventures();
	const { setShowInfo } = useAdventures();
	const { refreshAdvByAdv } = useAdventures();
	const { adventurersByAdventure, setAdventurersByAdventure } = useAdventures();

	useEffect(() => {
		try {
			setAdventurersByAdventure(null); // Clear the previous adventurers
			axios
				.get(`/applications/${selectedAdventure._id}/accepted`)
				.then((res) => {
					setAdventurersByAdventure(res.data);
				});
		} catch (error) {
			resInfoError(error.response.data.message, setResInfos);
		}
	}, [
		setAdventurersByAdventure,
		setResInfos,
		selectedAdventure,
		refreshAdvByAdv,
	]);

	return (
		<>
			{adventurersByAdventure && adventurersByAdventure.length > 0 ? (
				<div className="adventurers-card">
					<XButton action={() => setShowInfo(null)} />
					<h3>Adventurers</h3>
					<ul className="adventurers">
						{adventurersByAdventure.map((adventurer) => (
							<Adventurer adventurer={adventurer} key={adventurer._id} />
						))}
					</ul>
				</div>
			) : null}
		</>
	);
}
