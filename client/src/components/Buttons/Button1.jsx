import "./Button1.css";

export default function Button1({text, action, className}) {
    return (
        <div onClick={action} className={`button1 ${className}`}>{text}</div>
    )
}