import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdventures } from "../contexts/useAdventures";
import ShowHead from "../components/ShowHead/ShowHead";
import PostBoard from "../components/PostBoard/PostBoard";
import "./Show.css";
import DescriptionCardContainer from "../components/DescriptionCard/DescriptionCardContainer";
import ShowMainAction from "../components/ShowMainAction/ShowMainAction";
import ShowInfoCardContainer from "../components/ShowInfoCard/ShowInfoCardContainer";

export default function Show() {
	const { selectedAdventure, setSelectedAdventure } = useAdventures();
	const { id } = useParams();
	const [showInfoContainer, setShowInfoContainer] = useState(false);

	useEffect(() => {
		if (!selectedAdventure) {
			axios
				.get(`/adventures/${id}`)
				.then((res) => setSelectedAdventure(res.data));
		}
	}, [id, selectedAdventure, setSelectedAdventure]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "auto",
		});
	}, []);

	const setInfoVisibility = () => {
		setShowInfoContainer(oldValue => !oldValue);
	}

	return (
		<>
			{selectedAdventure ? (
				<div className="show-container">
					<ShowHead adventure={selectedAdventure} />
					<div className="show-main-content">
						<ShowMainAction adventureId={id} setInfoVisibility={setInfoVisibility}/>
						<section className="show-main-grid">
							<DescriptionCardContainer
								description={selectedAdventure.description}
							/>
							<PostBoard adventureId={id} />
							<DescriptionCardContainer
								description={selectedAdventure.description}
							/>
						</section>
						{showInfoContainer ? (
							<ShowInfoCardContainer
								description={selectedAdventure.description}
								setVisibility={setInfoVisibility}
							/>
						) : null}
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}
