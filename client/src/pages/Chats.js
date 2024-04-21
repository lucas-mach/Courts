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

    //change to contain data from database like editpref???
    const [message, setMessage] = useState("");

    const sendMessage = async (event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/chats", {message : message, username : username, contact : selectedMatch.username});
        } catch (err){
            console.error(err);
        }
    };

    

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

    const NoChatSelected = () => {
        return (
            <div className="message-box">
                <p>Start Chatting!</p>            
            </div>
        )
    }

    useEffect(() => {
        return () => setSelectedMatch(null)
    }, [])

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
    })

    const { matches } = useGetMatches();
    //const matches = matchObjects['matches'];

    return (
        
        <div>
            
            <div className="chat">
                <div className="match-box">
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
                        <div className=".message-box">
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
    )
}

export default Chats

