import "./ShowMainAction.css";
import Button1 from "../Buttons/Button1";
import { useAdventures } from "../../contexts/useAdventures";
import {
	applyToAdventure,
	getIsAccepted,
	getIsApplied,
} from "./showmainActionHelpers";
import { getApplicants } from "../AdventurersCard/adventurersCardHelpers";
import { useEffect, useState } from "react";
import ShowOptions from "./ShowOptions";
import OptionsButton from "../Buttons/OptionsButton";
import axios from "axios";

export default function ShowMainAction({ adventureId, openShowPostWindow }) {
	const { user } = useAdventures();
	const { setResInfos } = useAdventures();
	const { adventurersByAdventure, setAdventurersByAdventure } = useAdventures();
	const { applicationsByAdventure, setApplicationsByAdventure } =
		useAdventures();
	const { setRefreshAplByAdv } = useAdventures();
	const { setShowInfo } = useAdventures();
	const [isApplied, setIsApplied] = useState(false);
	const [isAccepted, setIsAccepted] = useState(false);
	const [showOptions, setShowOptions] = useState(false);

	const userId = user ? user._id : null;

	useEffect(() => {
		setIsAccepted(false);
		if (user && adventurersByAdventure) {
			setIsAccepted(getIsAccepted(user._id, adventurersByAdventure));
		}

		setIsApplied(false);
		if (user && applicationsByAdventure) {
			setIsApplied(getIsApplied(user._id, applicationsByAdventure));
		}
	}, [user, adventurersByAdventure, applicationsByAdventure]);

	useEffect(() => {
		if (showOptions) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [showOptions]);

	const clickJoinButton = async () => {
		await applyToAdventure(
			adventureId,
			userId,
			setResInfos,
			setRefreshAplByAdv
		);
	};

	return (
		<section className="show-main-action">
			{isAccepted ? (
				<Button1
					action={openShowPostWindow}
					className="btn-fit-content btn-big"
					text="Post"
				/>
			) : isApplied ? (
				<Button1 className="btn-fit-content btn-big btn-muted" text="Applied" />
			) : (
				<Button1
					action={clickJoinButton}
					className="btn-fit-content btn-big"
					text="Apply"
				/>
			)}
			<div className="show-main-action-info">
				<Button1
					action={() => setShowInfo("description")}
					className="desc-button btn-fit-content btn-medium btn-info "
					text="Description"
				/>
				{adventurersByAdventure && adventurersByAdventure.length > 0 ? (
					<Button1
						action={() => setShowInfo("adventurers")}
						className="adventurers-button btn-fit-content btn-medium btn-info"
						text="Adventurers"
					/>
				) : null}
				{applicationsByAdventure && applicationsByAdventure.length > 0 ? (
					<Button1
						action={() => setShowInfo("applicants")}
						className="applicants-button btn-fit-content btn-medium btn-info"
						text="Applicants"
					/>
				) : null}
				{isApplied || isAccepted ? (
					<OptionsButton action={() => setShowOptions(true)} />
				) : null}
			</div>
			{showOptions ? (
				<ShowOptions closeOptions={() => setShowOptions(false)} />
			) : null}
		</section>
	);
}
