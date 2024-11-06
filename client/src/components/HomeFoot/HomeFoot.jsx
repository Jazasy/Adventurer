import { useEffect } from "react";
import "./HomeFoot.css";
import Button1 from "../Buttons/Button1";
import { useAdventures } from "../../contexts/useAdventures";
import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

export default function HomeFoot() {
	const { adventures, setAdventures } = useAdventures();
	const { setResInfos } = useAdventures();

	useEffect(() => {
		const homeHead = document.querySelector(".home-head");
		const homeFoot = document.querySelector(".home-foot");
		homeFoot.style.top = `${homeHead.offsetHeight}px`;
	}, []);

	const refresh = async () => {
		try {
			setAdventures(null);
			const result = await axios.get("/adventures/randoms");
			setAdventures(result.data);
			resInfoError(
				"You have refreshed the adventure board successfully!",
				setResInfos
			);
		} catch (error) {
			if (error.response.data.message) {
				resInfoError(error.response.data.message, setResInfos);
			}
		}
	};

	return (
		<footer className="home-foot">
			<h1 className="title2">Refresh Advenure Board</h1>
			<Button1
				action={refresh}
				className="btn-big btn-fit-content"
				text="Refresh"
			/>
		</footer>
	);
}
