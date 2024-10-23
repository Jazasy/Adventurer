import { useRef } from "react";
import "./PfpInput.css";

export default function PfpInput(){
    const pfpInputRef = useRef();

    const clickPfpInput = () => {
        pfpInputRef.current.click();
    }

    return (
        <div className="pfp-input">
            <img
                onClick={clickPfpInput}
				className="pfp-image"
				src="https://res.cloudinary.com/dp2xr7jgj/image/upload/v1729179548/Adventurer/seed/uiwuefdckhu8spiqb4pa.jpg"
				alt="profile picture"
			/>
            <i onClick={clickPfpInput} className="pfp-plus-icon">+</i>
            <input ref={pfpInputRef} className="fake-pfp-input" type="file" name="" id="" />
        </div>
    )
}