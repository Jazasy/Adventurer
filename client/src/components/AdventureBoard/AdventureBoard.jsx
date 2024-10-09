import "./AdventureBoard.css";
import AdventureCard from "../AdventureCard/AdventureCard";
import axios from "axios";
import { useEffect } from "react";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

export default function AdventureBoard() {
	const { adventures, setAdventures } = useAdventures();
	const { setResInfos } = useAdventures();

	useEffect(() => {
		try {
			axios.get("/adventures").then((res) => {
				setAdventures(res.data);
			});
		} catch (error) {
			if(error.response.data.message){
				resInfoError(error.response.data.message, setResInfos);
			}
		}
	}, [setAdventures, setResInfos]);

	return (
		<div className="adventure-board">
			{adventures.map((adventure, index) => {
				return <AdventureCard key={index} adventure={adventure} />;
			})}
		</div>
	);
}
