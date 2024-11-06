import "./AdventureBoard.css";
import AdventureCard from "../AdventureCard/AdventureCard";
import axios from "axios";
import { useEffect } from "react";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import Loader from "../Loader/Loader";

export default function AdventureBoard() {
	const { adventures, setAdventures } = useAdventures();
	const { setResInfos } = useAdventures();

	useEffect(() => {
		try {
			axios.get("/adventures/randoms").then((res) => {
				setAdventures(res.data);
			});
		} catch (error) {
			if(error.response.data.message){
				resInfoError(error.response.data.message, setResInfos);
			}
		}
	}, [setAdventures, setResInfos]);

	return (
		<>
			{adventures ? (
				<div className="adventure-board">
				{adventures.map((adventure, index) => {
					return <AdventureCard key={index} adventure={adventure} />;
				})}
			</div>
			) : (
				<Loader className="loader-big loader-center"/>
			)}
		</>
	);
}
