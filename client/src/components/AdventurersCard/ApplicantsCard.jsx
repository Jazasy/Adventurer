import "./ApplicantsCard.css";
import axios from "axios";
import { useEffect } from "react";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import { useAdventures } from "../../contexts/useAdventures";
import XButton from "../Buttons/XButton";
import ApplicantsListItem from "./ApplicantsListItem";

export default function ApplicantsCard() {
	const { setResInfos } = useAdventures();
	const { applicationsByAdventure, setApplicationsByAdventure } =useAdventures();
	const { selectedAdventure } = useAdventures();
	const { refreshAplByAdv } = useAdventures();
	const { setShowInfo } = useAdventures();

	useEffect(() => {
		try {
			setApplicationsByAdventure(null);		// Clear the previous applications
			axios.get(`/applications/${selectedAdventure._id}`).then((res) => {
				setApplicationsByAdventure(res.data);
			});
		} catch (error) {
			resInfoError(error.response.data.message, setResInfos);
		}
	}, [setApplicationsByAdventure, setResInfos, selectedAdventure, refreshAplByAdv]);

	return (
		<>
			{applicationsByAdventure && applicationsByAdventure.length > 0 ? (
				<div className="adventurers-card">
					<XButton action={() => setShowInfo(null)} />
					<h3>Applicants</h3>
					<ul className="adventurers">
						{applicationsByAdventure.map((application) => (
							<ApplicantsListItem
								application={application}
								key={application._id}
							/>
						))}
					</ul>
				</div>
			) : null}
		</>
	);
}
