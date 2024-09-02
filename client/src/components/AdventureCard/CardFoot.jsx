import Button1 from "../Buttons/Button1";
import "./CardFoot.css";
import { useNavigate } from "react-router-dom";

export default function CardFoot({adventure}) {
    const navigate = useNavigate();

    return (
        <div className="card-foot">
            <h3>{adventure.title}</h3>
            <Button1 text="View" action={() => navigate(`/adventures/${adventure._id}`)} />
        </div>
    )
}