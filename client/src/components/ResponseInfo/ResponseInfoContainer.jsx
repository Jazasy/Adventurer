import ResponseInfo from "./ResponseInfo";
import "./ResponseInfoContainer.css";
import { useAdventures } from "../../contexts/useAdventures";
import { useEffect } from "react";

export default function ResponseInfoContainer() {
	const { resInfos, setResInfos } = useAdventures();
	
	return (
		<div className="response-info-container">
			{resInfos.map((resInfo, index) => {
				return <ResponseInfo key={index} info={resInfo} />;
			})}
		</div>
	);
}
