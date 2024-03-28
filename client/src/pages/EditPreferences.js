import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function EditPreferences() {

    const [football, setfootball] = useState(false);
    const [basketball, setbasketball] = useState(false);
    const [tennis, settennis] = useState(false);
    const [sex, setsex] = useState(0);
    const [age, setage] = useState(0);
    const username = localStorage.getItem("userID");
    const naviagate = useNavigate();


    const editPref = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/editPreferences", 
            {   username: username, 
                sex: sex,
                age: age,
                football: football, 
                basketball: basketball, 
                tennis: tennis,
            });
            naviagate("/");
        }
        catch(err) {
            console.error(err);
        }
    };

    //Only allows for male or female to be checked, not both
    //document.addEventListener("DOMContentLoaded", function() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"][name="sex-option"]');
      
        checkboxes.forEach(function(checkbox) {
          checkbox.addEventListener("change", function() {
            checkboxes.forEach(function(otherCheckbox) {
              if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
              }
            });
          });
        });
    //});

    return (
        <div>
            <a href="/" class="home">Home</a>

            <h2>Profile</h2>
            
            <div class="checkboxes">
                <label for="sex-option">Sex: </label>
                <label>
                    <input type="checkbox" name="sex-option" value="male" onClick = {(event) => {setsex(1)}}></input>
                    Male
                </label>
                <label>
                    <input type="checkbox" name="sex-option" value="female" onClick={(event)=>{setsex(2)}}></input>
                    Female
                </label>
            </div>

            <label for="age">Age: </label>
            <input  type="number" 
                    value={age} 
                    name="age" 
                    min="18" 
                    max="120" 
                    onChange={(event)=>{setage(event.target.value)}}>
            </input>


            <div>
                <label>Football</label>
                <input 
                type="checkbox" 
                onClick = {(event) => {
                    if (football) {
                        setfootball(false);
                    } else {
                        setfootball(true);
                    }
                }}>
                </input>
            </div>
            <div>
                <label>Basketball</label>
                <input 
                type="checkbox" 
                onClick = {(event) => {
                    if (basketball) {
                        setbasketball(false);
                    } else {
                        setbasketball(true);
                    }
                }}>
                </input>
            </div>
            <div>
                <label>Tennis</label>
                <input 
                type="checkbox" 
                onClick = {(event) => {
                    if (tennis) {
                        settennis(false);
                    } else {
                        settennis(true);
                    }
                }}>
                </input>
            </div>
            <div>
                <button onClick={editPref}>Submit</button>
            </div>
        </div>
    );
}


export default EditPreferences