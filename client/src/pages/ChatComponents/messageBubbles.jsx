import useMatch from "../../zustand/useMatch";

//message bubble display. Changes for who sent the message. 
const MessageBubble = ( {textMessage} ) => {
    const {selectedMatch, setSelectedMatch} = useMatch();

    console.log("Message Content: ", textMessage)
    return (
        <div className={`${textMessage.recieverId === selectedMatch._id ? "chat-bubble-right" : "chat-bubble-left"}`}>
            <div className={`${textMessage.recieverId === selectedMatch._id ? "chat-bubble-reciever" : "chat-bubble-sender"}`}>
                <p>{textMessage.message}</p>
            </div>
        </div>
    )
}

export default MessageBubble