import React from "react";
import { useState } from "react";
import TinderCard from 'react-tinder-card'
import { useNavigate } from "react-router-dom";
import "./Tindercard.css";



function TinderCards() {
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
  
        <div className="tinderCards__cardContainer">
          {people.map((person) => (
            <TinderCard
              className="swipe"
              key={person.name}
              preventSwipe={['up', 'down']}
            >
              <div 
                style={{backgroundImage: `url(${person.url})`}}
                className="card"
              >
                <h3>{person.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
    );
  }







export default TinderCards;