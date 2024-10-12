import "./ApplicantsListItem.css";
import Adventurer from "./Adventurer";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

export default function ApplicantsListItem({ application }) {
	const { setRefreshAdvByAdv } = useAdventures();
	const { setRefreshAplByAdv } = useAdventures();
	const { setResInfos } = useAdventures();
	const { selectedAdventure } = useAdventures();
	const { user } = useAdventures();

	const isLeader = selectedAdventure.leader._id === user._id;

	const acceptApplication = async () => {
		try {
			const result = await axios.patch(`/applications/${application._id}`);
			setRefreshAdvByAdv((prev) => !prev);
			setRefreshAplByAdv((prev) => !prev);
			result.data.message && resInfoError(result.data.message, setResInfos);
		} catch (error) {
			if (error.response.data.message) {
				resInfoError(error.response.data.message, setResInfos);
			}
		}
	};

	return (
		<div className="applicants-list-item">
			<Adventurer adventurer={application} />
			<div className="applicants-list-action">
				<i className="fa-solid fa-eye applicant-list-eye"></i>
				{isLeader ? (
					<>
						<i className="fa-solid fa-circle-xmark applicants-list-x"></i>
						<i
							className="fa-solid fa-circle-check applicants-list-check"
							onClick={acceptApplication}
						></i>
					</>
				) : null}
			</div>
		</div>
	);
}
