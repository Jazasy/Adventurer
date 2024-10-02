import "./AdventurersCard.css";
import axios from "axios";
import { useEffect } from "react";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import { useAdventures } from "../../contexts/useAdventures";
import Adventurer from "./Adventurer";
import XButton from "../Buttons/XButton";

export default function AdventurersCard() {
	const { setResInfos } = useAdventures();
	const { adventurersByAdventure, setAdventurersByAventure } = useAdventures();
	const { selectedAdventure } = useAdventures();
	const { refreshAdvByAdv } = useAdventures();
    const { setShowInfo } = useAdventures();

	const adventureId = selectedAdventure._id;

	useEffect(() => {
		try {
			axios.get(`/adventures/${adventureId}/applications`).then((res) => {
				setAdventurersByAventure(res.data);
			});
		} catch (error) {
			resInfoError(error.response.data.message, setResInfos);
		}
	}, [setAdventurersByAventure, setResInfos, adventureId, refreshAdvByAdv]);

	return (
		<div className="adventurers-card">
			<XButton action={() => setShowInfo(null)} />
			<h3>Adventurers</h3>
			<ul className="adventurers">
				{adventurersByAdventure && adventurersByAdventure.length > 0 ? (
					adventurersByAdventure.map((adventurer) => (
						<Adventurer adventurer={adventurer} key={adventurer._id} />
					))
				) : (
					null
				)}
			</ul>
		</div>
	);
}
