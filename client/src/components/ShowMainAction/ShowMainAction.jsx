import "./ShowMainAction.css";
import Button1 from "../Buttons/Button1";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

export default function ShowMainAction({ adventureId, setInfoVisibility }) {
	const { user } = useAdventures();
	const { setResInfos } = useAdventures();
	const userId = user ? user.id : "";

	const applyToAdventure = async () => {
		try {
			const result = await axios.post(
				`/adventures/${adventureId}/applications`,
				{ user: userId }
			);
			resInfoError(result.data.message, setResInfos);
		} catch (error) {
			resInfoError(error.response.data.message, setResInfos);
		}
	};

	return (
		<section className="show-main-action">
			<Button1
				action={applyToAdventure}
				className="btn-fit-content btn-big"
				text="Join"
			/>
			<div className="show-main-action-info">
				<Button1
					action={setInfoVisibility}
					className="desc-button btn-fit-content btn-medium btn-info "
					text="Description"
				/>
				<Button1
					className="members-button btn-fit-content btn-medium btn-info"
					text="Members"
				/>
			</div>
		</section>
	);
}
