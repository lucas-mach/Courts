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

  const addMatch = async (event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      const resp = await axios.post("http://localhost:3001/addMatch", {username: username, matchUsername : user.username});
    } catch(err) {
      console.err(err)
    }
  }

  const getUser = async (event) => {
    if (event) {
      event.preventDefault();
    }
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
    
    if (event) {
      event.preventDefault();
    }
    try {
        const resp = await axios.post(`http://localhost:3001/getUsersSimilar`, {username});
        setUsers(resp.data);
        
       
        
    }
    catch (err) {
        console.error(err);
    }
  };
  useEffect(() => {
    // This function will run when the component mounts
    // You can place your code here
    getUsers()
  
    
    // If you want to run some cleanup when the component unmounts,
    // you can return a function from useEffect
    return () => {
      // Cleanup code here
      console.log('Got users');
    };
  }, []);
    
  
  
  
    
    
    // const people = [];
    // setPeople([...people, 'ryan', 'lucas']) to add ppl
    
    
    return (
      <div>
      <button onClick={getUser}>Click for new Potential Match</button>

      {!user ? <h2>Find a new match</h2> :
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
              {/* Displaying username and sport under each other */}
              <div className="Info">
                <h3>{user.username}</h3>
                <h3>Age: {user.age}</h3>
              </div>
            </div>
          </TinderCard>
        </div>
      }
    </div>
    );
  }







export default TinderCards;