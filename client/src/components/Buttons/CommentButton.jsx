import "./CommentButton.css";
import { useState } from "react";

export default function CommentButton({action}) {
    const [isCommentActive, setIsCommentActive] = useState(false);

    const clickComment = () => {
		setIsCommentActive((oldIsCommentActive) => !oldIsCommentActive);
        //action();
	};

    return <div className="comment-button">
        {isCommentActive ? (
        <i
            className="fa-solid fa-comment comment-icon"
            onMouseDown={clickComment}
        ></i>
    ) : (
        <i
            className="fa-regular fa-comment comment-icon"
            onMouseDown={clickComment}
        ></i>
    )}
    </div>
}