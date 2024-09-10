import { createContext, useState } from "react";

export const AdventuresContext = createContext();

export const AdventuresProvider = ({ children }) => {
	const [adventures, setAdventures] = useState([]);
	const [selectedAdventure, setSelectedAdventure] = useState(null);
	const [resInfos, setResInfos] =useState([]);
	const [user, setUser] = useState(null);

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
			}}
		>
			{children}
		</AdventuresContext.Provider>
	);
};
