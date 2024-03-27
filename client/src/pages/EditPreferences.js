import React from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


function EditPreferences() {

    const [football, setfootball] = useState(false);
    const [basketball, setbasketball] = useState(false);
    const [tennis, settennis] = useState(false);
    const username = localStorage.getItem("userID");


    const editPref = async (event) => {
        event.preventDefault();
        try {
            
            const response = await axios.post("http://localhost:3001/editPreferences", {username:username, football: football, basketball: basketball, tennis: tennis});
            
        }
        catch(err) {
            console.error(err);
        }
    };


    return (
        <div>
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
                <button onClick= {editPref}>Submit</button>
            </div>
        </div>
    );
}


export default EditPreferences