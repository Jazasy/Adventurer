import { useEffect } from "react";
import "./ResponseInfo.css";
import { useAdventures } from "../../contexts/useAdventures";

export default function ResponseInfo({ info }) {
	const { resInfos, setResInfos } = useAdventures();

	useEffect(() => {
		const timer = setTimeout(() => {
			setResInfos((oldResInfos) =>
				oldResInfos.filter((resInfo) => resInfo !== info)
			);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="response-info">
			<h1>{info}</h1>
		</div>
	);
}
