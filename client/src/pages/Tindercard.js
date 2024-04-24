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
      console.log(username, user.username)
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
        if (index > users.length) {
          setIndex(0)
        }
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

  const handleSwipe = (direction, username) => {
    if (direction === 'left') {
      console.log(`${username} swiped left`);
      getUser();
      // Perform actions for left swipe
    } else if (direction === 'right') {
      console.log(`${username} swiped right`);
      addMatch();
      getUsers();
      getUser();
      // Perform actions for right swipe
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
      <div className="matching-page">

      {!user ? <>
                <div className="init-matching-page">
                  <div className="init-matching-center">
                    <h2>Start Matching</h2> 
                    <p>Start matching based on your preferences!</p>
                    <button className="btn btn-primary"onClick={getUser}>Find Me A Match</button>
                  </div>
                </div>
              </> :
        <div className="tinderCards__cardContainer">
          <div className="matching-no">
            <h1>discard</h1>
          </div>
          <TinderCard
            className="swipe"
            key={user.username}
            preventSwipe={['up', 'down']}
            onSwipe={(direction) => handleSwipe(direction, user.username)}
          >
            <div 
              style={{backgroundImage: `url(${user.url})`}}
              className="card"
            >
              {/* Displaying username and sport under each other */}
              <div className="Info">
                
                <h3>
                  <h3>{user.first_name}</h3>
                  <h3>Age: {user.age}</h3>
                  <h3>Gender: {user.sex}</h3>
                  <h3>About me: {user.about}</h3>
                  <h3 className="sports" >Sport Interests: {user.football ? <> <div>football</div>
                  </> : <div></div>} 
                  {user.basketball ? <> <div>basketball</div>
                  </> : <div></div>} 
                  {user.tennis ? <> <div>tennis</div>
                  </> : <div></div>} 
                  {user.baseball ? <> <div>baseball</div>
                  </> : <div></div>} 
                  {user.cycling ? <> <div>cycling</div>
                  </> : <div></div>} 
                  {user.tableTennis ? <> <div>tableTennis</div>
                  </> : <div></div>} 
                  {user.running ? <> <div>running</div>
                  </> : <div></div>} 
                  {user.soccer ? <> <div>soccer</div>
                  </> : <div></div>} 
                  {user.volleyball ? <> <div>volleyball</div>
                  </> : <div></div>} 
                  </h3>


                </h3>
                
                
                {/* <h3>Gender: {user.sex}</h3> */}

              </div>
            </div>
          </TinderCard>
          <div className="matching-yes">
            <h1>match</h1>
          </div>
        </div>
      }
    </div>
    );
  }







export default TinderCards;