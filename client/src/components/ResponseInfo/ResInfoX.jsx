import "./ResInfoX.css";
import { useAdventures } from "../../contexts/useAdventures";

export default function ResInfoX({ info }) {
	const { resInfos, setResInfos } = useAdventures();

	const handleClick = () => {
		setResInfos((oldResInfos) =>
			oldResInfos.filter((resInfo) => resInfo !== info)
		);
	};

	return <i className="fa-solid fa-x" onClick={handleClick}></i>;
}
