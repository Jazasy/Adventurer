import axios from "axios";

const logOut = async (setUser, navigate, setIsMenuOpen) => {
    await axios.delete("/logout");
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/home");
    setIsMenuOpen(false);
}

export { logOut };