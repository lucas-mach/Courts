import React from "react";
import { useState, useEffect } from "react";
import TinderCard from 'react-tinder-card'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Tindercard.css";



function TinderCards() {
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const username =  localStorage.getItem("userID")

  const getUser = async (event) => {
    event.preventDefault();
    try {
        console.log(index)
        const resp = await axios.get(`http://localhost:3001/card/${users[index]}`, );
        setIndex(index+1)
        setUser(resp.data)
        
        
       
        
    }
    catch (err) {
        console.error(err);
    }
  };
  const getUsers = async (event) => {
    event.preventDefault();
    try {
        const resp = await axios.post(`http://localhost:3001/getUsersSimilar`, {username});
        setUsers(resp.data);
        
       
        
    }
    catch (err) {
        console.error(err);
    }
  };
    
  
  
  
    
    const [people, setPeople] = useState([
      {
        name: "lex friedman",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCShzshMRpDbvH2eHM78rQl-ISL8b1YM_n-A&usqp=CAU"
      },
      {
        name: "ghost of Kyiv",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Samhydetedtalk2070_%28cropped%29.png/220px-Samhydetedtalk2070_%28cropped%29.png"
      }
    ]);
    // const people = [];
    // setPeople([...people, 'ryan', 'lucas']) to add ppl
    
  
    return (
      <div>
        <h1>Tinder Cards</h1>
        <button onClick={getUser} >New User</button>
        <button onClick={getUsers}>Get Matches</button>

        {!user ? <h1>Find User</h1> :
          <div className="tinderCards__cardContainer">
            
          
          <TinderCard
            className="swipe"
            key={user.username}
            preventSwipe={['up', 'down']}
          >
            <div 
              style={{backgroundImage: `url(${user.url})`}}
              className="card"
            >
              <h3>{user.username}</h3>
            </div>
          </TinderCard>
          
        </div>
          
        }
          
          
          
        
      </div>
    );
  }







export default TinderCards;