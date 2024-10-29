import "./Message.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

export default function Message() {
    const [message, setMessage] = useState("");

    const socket = io.connect(import.meta.env.VITE_SERVER_URL);

    const sendMessage = (event) => {
        event.preventDefault();
        socket.emit("send_message", {message: "Hello"});
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessage(data.message);
        })
    }, [socket])
    
	return (
		<main className="message-container">
            <p>{message}</p>
			<form onSubmit={sendMessage}>
				<input type="text" name="messageIntpu" id="messageInput" />
				<button onClick={sendMessage}>Send</button>
			</form>
		</main>
	);
}
