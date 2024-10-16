import XButton from "../Buttons/XButton";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import "./ShowOptions.css";
import { useAdventures } from "../../contexts/useAdventures";
import { abandonAdventure } from "./showmainActionHelpers";

export default function ShowOptions({ closeOptions }) {
	const { setResInfos } = useAdventures();
	const { user } = useAdventures();
	const { applicationsByAdventure } = useAdventures();
	const { adventurersByAdventure } = useAdventures();
    const { setRefreshAplByAdv } = useAdventures();
    const { setRefreshAdvByAdv } = useAdventures();

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

	return (
		<main className="show-options-container">
			<ul className="show-options">
				<XButton action={closeOptions} />
				<li className="show-options-item-with-icon">
					<p onClick={clickAbandonAdventure} className="show-options-item">
						abandon adventure
					</p>
					<i
						onClick={clickAbandonAdventure}
						className="fa-solid fa-person-walking-arrow-right show-options-leave-icon"
					></i>
				</li>
			</ul>
		</main>
	);
}
