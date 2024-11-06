import { createContext, useState, useEffect } from "react";
import {useLocation} from "react-router-dom";

export const AdventuresContext = createContext();

export const AdventuresProvider = ({ children }) => {
	const [adventures, setAdventures] = useState(null);
	const [selectedAdventure, setSelectedAdventure] = useState(null);
	const [resInfos, setResInfos] =useState([]);
	const [user, setUser] = useState(null);
	const [postIdForComments, setPostIdForComments] = useState(null);
	const [applicationsByAdventure, setApplicationsByAdventure] = useState([]);
	const [adventurersByAdventure, setAdventurersByAdventure] = useState([]);
	const [refreshAplByAdv, setRefreshAplByAdv] = useState(true);
	const [refreshAdvByAdv, setRefreshAdvByAdv] = useState(true);
	const [showInfo, setShowInfo] = useState(null);
	const [showMessages, setShowMessages] = useState(false);

	const location = useLocation();

	useEffect(() => {
        if (postIdForComments) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [postIdForComments]);

	useEffect(() => {
		setPostIdForComments(null);
	}, [location]);

	return (
		<AdventuresContext.Provider
			value={{
				adventures,
				setAdventures,
				selectedAdventure,
				setSelectedAdventure,
				resInfos,
				setResInfos,
				user, 
				setUser,
				postIdForComments,
				setPostIdForComments,
				applicationsByAdventure,
				setApplicationsByAdventure,
				adventurersByAdventure,
				setAdventurersByAdventure,
				refreshAplByAdv,
				setRefreshAplByAdv,
				refreshAdvByAdv,
				setRefreshAdvByAdv,
				showInfo,
				setShowInfo,
				showMessages,
				setShowMessages
			}}
		>
			{children}
		</AdventuresContext.Provider>
	);
};
