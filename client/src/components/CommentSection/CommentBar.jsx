import "./CommentBar.css";
import TextInput from "../inputs/TextInput";
import Button1 from "../Buttons/Button1";

export default function CommentBar(){
    return (
        <div className="comment-bar">
            <TextInput />
            <Button1 text="post" className="btn-fit-content btn-big"/>
        </div>
    )
}