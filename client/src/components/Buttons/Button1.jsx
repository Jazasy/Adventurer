import "./Button1.css";

export default function Button1({text, action}) {
    return (
        <div onClick={action} className="button1">{text}</div>
    )
}