import "./ShowMainAction.css";
import Button1 from "../Buttons/Button1";
import { useAdventures } from "../../contexts/useAdventures";
import { applyToAdventure, getIsApplied } from "./showmainActionHelpers";
import { getAdventurers } from "../AdventurersCard/adventurersCardHelpers";
import { useEffect, useState } from "react";
import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import PostWindow from "./PostWindow";

export default function ShowMainAction({ adventureId }) {
	const { user } = useAdventures();
	const { setResInfos } = useAdventures();
	const { setAdventurersByAventure } = useAdventures();
	const { setRefreshAdvByAdv } = useAdventures();
	const { setShowInfo } = useAdventures();
	const [isApplied, setIsApplied] = useState();
	const [showPostWindow, setShowPostWindow] = useState(false);

	const userId = user ? user._id : null;

	useEffect(() => {
		if (user) {
			getIsApplied(user._id, adventureId, setResInfos, setIsApplied);
		}
	}, [user]);

	useEffect(() => {
		if (showPostWindow) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [showPostWindow]);

	const clickJoinButton = async () => {
		await applyToAdventure(
			adventureId,
			userId,
			setResInfos,
			setRefreshAdvByAdv
		);
		getAdventurers(adventureId, setAdventurersByAventure, setResInfos);
		getIsApplied(userId, adventureId, setResInfos, setIsApplied);
	};

	const clickPostButton = async () => {
		setShowPostWindow(true);
	};

	return (
		<section className="show-main-action">
			{isApplied ? (
				<Button1
					action={clickPostButton}
					className="btn-fit-content btn-big"
					text="Post"
				/>
			) : (
				<Button1
					action={clickJoinButton}
					className="btn-fit-content btn-big"
					text="Join"
				/>
			)}
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
			{showPostWindow ? (
				<PostWindow closeShowPostWindow={() => setShowPostWindow(false)} />
			) : null}
		</section>
	);
}
