import "./DeleteButton.css";

export default function DeleteButton({action}){
    return (
        <i onClick={action} className="fa-regular fa-trash-can delete-button"></i>
    )
}