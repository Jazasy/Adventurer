import { useEffect } from "react";
import "./ResponseInfo.css";
import { useAdventures } from "../../contexts/useAdventures";
import ResInfoX from "./ResInfoX";

export default function ResponseInfo({ info }) {
	const { resInfos, setResInfos } = useAdventures();

	useEffect(() => {
		const timer = setTimeout(() => {
			setResInfos((oldResInfos) =>
				oldResInfos.filter((resInfo) => resInfo !== info)
			);
		}, 5000);
		return () => clearTimeout(timer);
	}, [resInfos, setResInfos, info]);

	return (
		<div className="response-info">
			<h1>{info}</h1>
			<ResInfoX info={info}/>
		</div>
	);
}
