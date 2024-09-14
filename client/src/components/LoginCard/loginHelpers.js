import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

const getUser = async (setUser, setResInfos) => {
    try {
        const fetchedUser = await axios.get("/user");
        setUser(fetchedUser.data);
    } catch (error) {
        resInfoError(error.response.data.message, setResInfos);
    }
};

const loginUser = async (formData, setResInfos, navigate, setUser) => {
    try {
        let loginKeyType = "";
        let loginValue = "";
        if (formData.username_email) {
            loginKeyType = formData.username_email.includes("@")
                ? "email"
                : "username";
            loginValue = formData.username_email;
        } else {
            loginKeyType = "username";
            loginValue = formData.username;
        }

        const result = await axios.post("/login", {
            [loginKeyType]: loginValue,
            password: formData.password,
        });

        const accessToken = result.data.accessToken;
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            setResInfos((oldResInfos) => [
                ...oldResInfos,
                "You've successfully logged in!",
            ]);
            getUser(setUser, setResInfos);
            navigate("/home");
        } else {
            resInfoError("Invalid credentials", setResInfos);
        }
    } catch (error) {
        console.log(error);
        resInfoError(error.response.data.message, setResInfos);
    }
};

export { getUser, loginUser };