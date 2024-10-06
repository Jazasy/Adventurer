import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdventures } from "../contexts/useAdventures";
import ShowHead from "../components/ShowHead/ShowHead";
import PostBoard from "../components/PostBoard/PostBoard";
import "./Show.css";
import DescriptionCard from "../components/DescriptionCard/DescriptionCard";
import ShowMainAction from "../components/ShowMainAction/ShowMainAction";
import ShowInfoCardContainer from "../components/ShowInfoCard/ShowInfoCardContainer";
import AdventurersCard from "../components/AdventurersCard/AdventurersCard";
import { useState } from "react";
import PostWindow from "../components/ShowMainAction/PostWindow";
import { resInfoError } from "../components/ResponseInfo/resInfoHelpers";

export default function Show() {
	const { selectedAdventure, setSelectedAdventure } = useAdventures();
	const { id } = useParams();
	const { showInfo } = useAdventures();
	const { setResInfos } = useAdventures();
	const [showPostWindow, setShowPostWindow] = useState(false);

	useEffect(() => {
		if (!selectedAdventure) {
			axios
				.get(`/adventures/${id}`)
				.then((res) => setSelectedAdventure(res.data))
				.catch((error) =>
					resInfoError(error.response.data.message, setResInfos)
				);
		}
	}, [id, selectedAdventure, setSelectedAdventure]);

	useEffect(() => {
		if (showInfo) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [showInfo]);

	useEffect(() => {
		if (showPostWindow) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [showPostWindow]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "auto",
		});
	}, []);

	return (
		<>
			{selectedAdventure ? (
				<div className="show-container">
					<ShowHead adventure={selectedAdventure} />
					<div className="show-main-content">
						<ShowMainAction
							adventureId={id}
							openShowPostWindow={() => setShowPostWindow(true)}
						/>
						<section className="show-main-grid">
							<section className="description-card-container">
								<DescriptionCard description={selectedAdventure.description} />
							</section>
							<PostBoard adventureId={id} showPostWindow={showPostWindow} />
							<section>
								<AdventurersCard />
							</section>
						</section>
						{showInfo ? (
							<ShowInfoCardContainer
								description={selectedAdventure.description}
							/>
						) : null}
					</div>
					{showPostWindow ? (
						<PostWindow
							closeShowPostWindow={() => setShowPostWindow(false)}
							adventureId={id}
						/>
					) : null}
				</div>
			) : null}
		</>
	);
}
