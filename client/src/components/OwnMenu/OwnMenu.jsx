import "./OwnMenu.css";
import OwnMenuOwnPage from "./OwnMenuOwnPage";
import { useAdventures } from "../../contexts/useAdventures";
import { useState, useEffect } from "react";
import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import MyApplications from "./MyApplications";
import MyAcceptedApplications from "./MyAcceptedApplications";
import Loader from "../Loader/Loader";

export default function OwnMenu({ className }) {
	const { user } = useAdventures();
	const { setResInfos } = useAdventures();
	const [ownApplications, setOwnApplications] = useState(null);
	const [ownAcceptedApplications, setOwnAcceptedApplications] = useState(null);
	const [ownAdventures, setOwnAdventures] = useState(null);
	const { refreshAplByAdv } = useAdventures();
	const { refreshAdvByAdv } = useAdventures();

	useEffect(() => {
		if (user) {
			axios
				.get(`/applications/own/${user._id}`)
				.then((res) => {
					setOwnApplications(res.data);
					return axios.get(`/applications/own/${user._id}/accepted`);
				})
				.then((res) => {
					setOwnAcceptedApplications(res.data);
				})
				.catch((error) => {
					if (error.response.data.message) {
						resInfoError(error.response.data.message, setResInfos);
					}
				});
		}
	}, [user, setResInfos, refreshAplByAdv, refreshAdvByAdv]);

	return (
		<>
			{user ? (
				<div className={`own-menu ${className}`}>
					<p className="own-menu-titles">My Page</p>
					<OwnMenuOwnPage />
					<MyAcceptedApplications applications={ownAcceptedApplications} />
					<MyApplications applications={ownApplications} />
				</div>
			) : null}
		</>
	);
}
