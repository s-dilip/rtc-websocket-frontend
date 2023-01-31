import { useState } from "react";
import useWebSocket from "react-use-websocket";

export default function ChatRoom() {
  const [user, setUser] = useState("");

  useWebSocket("ws://localhost:8080", {
    onOpen: () => {
      console.log("Websocket Connection Established!");
    },
  });

  return <h1>ChatRoom</h1>;
}
