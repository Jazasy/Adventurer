import "./ShowMainAction.css";
import Button1 from "../Buttons/Button1";
import { useAdventures } from "../../contexts/useAdventures";
import { applyToAdventure } from "./showmainActionHelpers";
import { getAdventurers } from "../AdventurersCard/adventurersCardHelpers";

export default function ShowMainAction({ adventureId }) {
	const { user } = useAdventures();
	const { setResInfos } = useAdventures();
	const { setAdventurersByAventure } = useAdventures();
	const {setRefreshAdvByAdv} = useAdventures();
	const {setShowInfo} = useAdventures();

	const userId = user ? user._id : "";

	const clickJoinButton = () => {
		applyToAdventure(adventureId, userId, setResInfos, setRefreshAdvByAdv);
		getAdventurers(adventureId, setAdventurersByAventure, setResInfos);
		
	}

	return (
		<section className="show-main-action">
			<Button1
				action={clickJoinButton}
				className="btn-fit-content btn-big"
				text="Join"
			/>
			<div className="show-main-action-info">
				<Button1
					action={() => setShowInfo("description")}
					className="desc-button btn-fit-content btn-medium btn-info "
					text="Description"
				/>
				<Button1
					action={() => setShowInfo("adventurers")}
					className="members-button btn-fit-content btn-medium btn-info"
					text="Adventurers"
				/>
			</div>
		</section>
	);
}
