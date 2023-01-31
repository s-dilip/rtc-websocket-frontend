import { useState } from "react";
import useWebSocket from "react-use-websocket";

export default function ChatRoom() {
  const [user, setUser] = useState("");

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "ws://localhost:8080",
    {
      onOpen: () => {
        console.log("Websocket Connection Established!");
      },
    }
  );

  function handleSendMessage() {
    sendJsonMessage({ message: "Hello" });
  }

  return (
    <div>
      <h1>ChatRoom</h1>
      <button onClick={handleSendMessage}>Send Hello!</button>
    </div>
  );
}
