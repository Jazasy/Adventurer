import OwnMenu from "../components/OwnMenu/OwnMenu";
import "./Own.css";
import Show from "./Show";
import { useAdventures } from "../contexts/useAdventures";
import { useEffect } from "react";

export default function Own() {
    const { setSelectedAdventure } = useAdventures();

    useEffect(() => {
        setSelectedAdventure(null);
    }, [setSelectedAdventure])

    return (
        <main className="own-container">
            <OwnMenu />
            <Show className="rounded"/>
        </main>
    )
}