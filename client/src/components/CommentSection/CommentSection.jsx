import "./CommentSection.css";
import { useAdventures } from "../../contexts/useAdventures";
import CommentBar from "./CommentBar";

export default function CommentSection(){
    const { setShowCommentSection } = useAdventures();

    const closeCommentSection = () => {
        setShowCommentSection(false);
    }

    return (
        <div className="comment-section">
            <i onClick={closeCommentSection} className="fa-solid fa-xmark comment-section-x"></i>
            <CommentBar />
        </div>
    )
}