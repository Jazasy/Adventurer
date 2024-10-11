import XButton from "../Buttons/XButton";
import "./ShowOptions.css";

export default function ShowOptions({closeOptions}) {
    return (
        <main className="show-options-container">
            <div className="show-options">
                <XButton action={closeOptions}/>
                <p>abandon adventure</p>
            </div>
        </main>
    )
}