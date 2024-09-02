import { useContext } from "react";
import { AdventuresContext } from "./AdventuresContext";

export const useAdventures = () => useContext(AdventuresContext);
