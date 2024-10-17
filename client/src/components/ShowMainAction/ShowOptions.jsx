import XButton from "../Buttons/XButton";
import "./ShowOptions.css";
import { useAdventures } from "../../contexts/useAdventures";
import { abandonAdventure, deleteAdventure } from "./showmainActionHelpers";

export default function ShowOptions({ closeOptions }) {
	const { setResInfos } = useAdventures();
	const { user } = useAdventures();
	const { applicationsByAdventure } = useAdventures();
	const { adventurersByAdventure } = useAdventures();
	const { setRefreshAplByAdv } = useAdventures();
	const { setRefreshAdvByAdv } = useAdventures();
	const { selectedAdventure } = useAdventures();

	const userId = user ? user._id : null;

	const clickAbandonAdventure = () => {
		abandonAdventure(
			applicationsByAdventure,
			setRefreshAplByAdv,
			adventurersByAdventure,
			setRefreshAdvByAdv,
			userId,
			setResInfos
		);
		closeOptions();
	};

	const clickDeleteAdventure = async () => {
		deleteAdventure(
			applicationsByAdventure,
			setRefreshAplByAdv,
			adventurersByAdventure,
			setRefreshAdvByAdv,
			selectedAdventure._id,
			setResInfos
		);
		closeOptions();
	};

	return (
		<main className="show-options-container">
			<ul className="show-options">
				<XButton action={closeOptions} />
				<li className="show-options-item-with-icon">
					<p onClick={clickAbandonAdventure} className="show-options-item">
						Abandon Adventure
					</p>
					<i
						onClick={clickAbandonAdventure}
						className="fa-solid fa-person-walking-arrow-right show-options-leave-icon"
					></i>
				</li>
				{selectedAdventure.leader._id === userId ? (
					<li className="show-options-item-with-icon">
						<p onClick={clickDeleteAdventure} className="show-options-item">
							Delete Adventure
						</p>
						<i
							onClick={clickDeleteAdventure}
							className="fa-regular fa-trash-can show-options-trash-icon"
						></i>
					</li>
				) : null}
			</ul>
		</main>
	);
}
