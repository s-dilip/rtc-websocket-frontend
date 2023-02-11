import "./styles/MessageList.css";

export default function MessageList(props) {
  return (
    <div className="listContainer">
      {/* <h3>Messages</h3> */}
      {props.messages.map((message, i) => {
        const roboURL = "https://robohash.org/" + message.sender;

        return (
          <div key={i}>
            <div className="speechBubble">
              <div className="roboImgContainer">
                <img src={roboURL} alt="userImage" className="userRoboImage" />
              </div>
              <div className="contentContainer">
                <h2 className="senderName">{message.sender}</h2>
                <div>
                  <p className="messageContent">{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
