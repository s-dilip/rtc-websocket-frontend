import "./styles/MessageList.css";

export default function MessageList(props) {
  return (
    <div>
      <h3>Messages</h3>
      {props.messages.map((message, i) => {
        const roboURL = "https://robohash.org/" + message.sender;

        return (
          <div key={i}>
            <img src={roboURL} alt="userImage" className="userRoboImage" />
            <h3>{message.sender}</h3>
            <p>{message.content}</p>
          </div>
        );
      })}
    </div>
  );
}
