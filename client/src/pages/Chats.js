import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Matches from "./ChatComponents/matches.jsx";
import MessageBubble from "./ChatComponents/messageBubbles.jsx";
import useMatch from "../zustand/useMatch.js";





function Chats(){
    const username = localStorage.getItem("userID");
    const navigate = useNavigate();

    const { selectedMatch, setSelectedMatch } = useMatch();
    const [textMessages, setTextMessages] = useState([]);

    const [message, setMessage] = useState("");

    //send message and save in database
    const sendMessage = async (event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/chats", {message : message, username : username, contact : selectedMatch.username});
        } catch (err){
            console.error(err);
        }
    };

    
    //get user matches when loading page
    const useGetMatches = () => {
        const [matches, setMatches] = useState([]);

        useEffect(() => {
            const getMatches = async () => {
                try {
                    
                    const res = await axios.get("http://localhost:3001/chats", {
                        params: { username : username }
                    });
                    setMatches(res.data);
                    console.log("Lookie Here: ", res.data)
                } catch (err) {
                    console.error(err);
                }
            }
            getMatches();
        }, []);
        return { matches };
    }

    //if no chat selected, display this
    const NoChatSelected = () => {
        return (
            <div className="message-box">
                <h2>Start Chatting!</h2>            
            </div>
        )
    }

    //unselect chat when reloading page or navigating away
    useEffect(() => {
        return () => setSelectedMatch(null)
    }, [])

    //get messages from database when a different match chat is selected
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:3001/chats/:id", {
                    params: { username : username, contact : selectedMatch.username }
                });
                setTextMessages(res.data);
                console.log("Messages: ", res.data);
            } catch (err) {
                console.error(err);
            }
            return { textMessages };
        }
        if(selectedMatch?._id) getMessages();
    },[selectedMatch, sendMessage])

    const { matches } = useGetMatches();

    return (
        
        <div>
            <div className="chat">
                <div className="center-chat">
                    <div className="match-box">
                        <h2>Matches</h2>
                        {matches.map((match) => (
                            <Matches 
                                key={match._id}
                                match={match}
                            />
                        ))}
                    </div>

                    <div className="chat-divider"></div>
                        {!selectedMatch ? (
                            <NoChatSelected />
                        ) : (
                            <div className="message-box">
                                <div className="messages-box">
                                    {textMessages.map((textMessage) => (
                                        <MessageBubble 
                                            key={textMessage._id}
                                            textMessage={textMessage}
                                        />
                                    ))}

                                    
                                    
                                </div>

                                <div className="send-message-box">
                                <label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        required={true}
                                        placeholder="Write your messaage here..."
                                        value={message}
                                        onChange={(event) => {
                                            setMessage(event.target.value);
                                        }}
                                        />
                                </label>
                                <button className = "btn btn-primary" onClick = {sendMessage}>
                                    Send Message
                                </button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Chats
