import { createContext, useState, useEffect } from "react";

export const AdventuresContext = createContext();

export const AdventuresProvider = ({ children }) => {
	const [adventures, setAdventures] = useState([]);
	const [selectedAdventure, setSelectedAdventure] = useState(null);
	const [resInfos, setResInfos] =useState([]);
	const [user, setUser] = useState(null);
	const [showCommentSection, setShowCommentSection] = useState(false);

	useEffect(() => {
        if (showCommentSection) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [showCommentSection]);

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
				showCommentSection,
				setShowCommentSection
			}}
		>
			{children}
		</AdventuresContext.Provider>
	);
};
