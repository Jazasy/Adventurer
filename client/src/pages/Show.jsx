import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
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

export default function Show({ className }) {
	const { selectedAdventure, setSelectedAdventure } = useAdventures();
	let { id } = useParams();
	const { showInfo } = useAdventures();
	const { setResInfos } = useAdventures();
	const [showPostWindow, setShowPostWindow] = useState(false);

	!id && selectedAdventure && (id = selectedAdventure._id);

	const showContainerRef = useRef(null);
	const showHeadRef = useRef(null);

	const updateShowHeadWidth = () => {
		if (showHeadRef.current && showContainerRef.current) {
			const newWidth = `${showContainerRef.current.offsetWidth}px`;
			showHeadRef.current.style.width = newWidth;
		}
	};

	useEffect(() => {
		const handleResize = () => {
			updateShowHeadWidth();
		};

		window.addEventListener("resize", handleResize);
		updateShowHeadWidth();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (!selectedAdventure && id) {
			axios
				.get(`/adventures/${id}`)
				.then((res) => setSelectedAdventure(res.data))
				.catch((error) =>
					resInfoError(error.response.data.message, setResInfos)
				);
		}
	}, [id, selectedAdventure, setSelectedAdventure]);

	/* useEffect(() => {
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
	}, [showPostWindow]); */

	const [initialOverflow, setInitialOverflow] = useState('');

	useEffect(() => {
		const handleOverflow = (show) => {
			if (show) {
				const hasScrollbar = document.body.scrollHeight > window.innerHeight;
				if (hasScrollbar) {
					setInitialOverflow(document.body.style.overflow);
					document.body.style.overflow = "hidden";
				} else {
					document.body.style.overflow = "hidden";
				}
			} else {
				document.body.style.overflow = initialOverflow;
			}
		};

		handleOverflow(showInfo);
		return () => handleOverflow(false);
	}, [showInfo, initialOverflow]);

	useEffect(() => {
		const handleOverflow = (show) => {
			if (show) {
				const hasScrollbar = document.body.scrollHeight > window.innerHeight;
				if (hasScrollbar) {
					setInitialOverflow(document.body.style.overflow);
					document.body.style.overflow = "hidden";
				} else {
					document.body.style.overflow = "hidden";
				}
			} else {
				document.body.style.overflow = initialOverflow;
			}
		};

		handleOverflow(showPostWindow);
		return () => handleOverflow(false);
	}, [showPostWindow, initialOverflow]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "auto",
		});
	}, []);

	return (
		<>
			{selectedAdventure ? (
				<div className={`show-container ${className}`} ref={showContainerRef}>
					<ShowHead
						className={className}
						adventure={selectedAdventure}
						updateWidth={updateShowHeadWidth}
						ref={showHeadRef}
					/>
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
