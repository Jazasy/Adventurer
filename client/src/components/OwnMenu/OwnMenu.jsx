import "./OwnMenu.css";
import OwnMenuOwnPage from "./OwnMenuOwnPage";
import { useAdventures } from "../../contexts/useAdventures";
import { useState, useEffect } from "react";
import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import MyAdventures from "./MyAdventures";

export default function OwnMenu({className}) {
	const { user } = useAdventures();
	const { setResInfos } = useAdventures();
	const [ownApplications, setOwnApplications] = useState([]);

	useEffect(() => {
		if (user) {
			axios
				.get(`/applications/own/${user._id}`)
				.then((res) => {
					setOwnApplications(res.data);
				})
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
				<div className={`own-menu ${className}`}>
					<p className="own-menu-titles">My Page</p>
					<OwnMenuOwnPage />
					<MyAdventures applications={ownApplications} />
				</div>
			) : null}
		</>
	);
}
