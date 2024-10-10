import "./OwnMenu.css";
import OenMenuOwnPage from "./OwnMenuOwnPage";
import { useAdventures } from "../../contexts/useAdventures";
import { useState, useEffect } from "react";
import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import OwnMenuOwnAdventure from "./OwnMenuOwnAdventure";

export default function OwnMenu() {
	const { user } = useAdventures();
	const { setResInfos } = useAdventures();
	const [ownApplications, setOwnApplications] = useState([]);

	useEffect(() => {
		if (user) {
			axios
				.get(`/adventures/ownadventures/${user._id}`)
				.then((res) => setOwnApplications(res.data))
				.catch((error) => {
					if (error.response.data.message) {
						resInfoError(error.response.data.message, setResInfos);
					}
				});
		}
	}, [user, setResInfos]);

	return (
		<>
			{user ? (
				<div className="own-menu">
					<p className="own-menu-titles">My Page</p>
					<OenMenuOwnPage />
					<p className="own-menu-titles">My Adventures</p>
					{ownApplications.map((ownApplication) => (
						<OwnMenuOwnAdventure key={ownApplication._id} adventure={ownApplication.adventure} />
					))}
				</div>
			) : null}
		</>
	);
}
