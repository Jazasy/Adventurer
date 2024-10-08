import Button1 from "../Buttons/Button1";
import FileInput from "../inputs/FileInput";
import TextArea from "../inputs/TextArea";
import TextInput from "../inputs/TextInput";
import "./CreateForm.css";

export default function CreateForm() {
    return <form className="create-form">
        <TextInput />
        <TextArea />
        <FileInput />
        <Button1 className="btn-fit-content btn-big" text="Create"/>
    </form>
}