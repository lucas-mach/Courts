import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function EditPreferences() {

    const username = localStorage.getItem("userID");
    const naviagate = useNavigate();

    const [formData, setFormData] = useState({
        username: username,
        //college: "",
        baseball: false,
        basketball: false,
        cycling: false,
        football: false,
        golf: false,
        tableTennis: false,
        tennis: false,
        running: false,
        soccer: false,
        volleyball: false
    })

    const handleChange =(e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    console.log(formData)


    const editPref = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/editPreferences", 
            {   username: formData.username, 
                sex: formData.sex,
                age: formData.age,
                college: formData.college,
                baseball: formData.baseball,
                basketball: formData.basketball,
                cycling: formData.cycling,
                football: formData.football, 
                golf: formData.golf,
                tableTennis: formData.tableTennis,
                tennis: formData.tennis,
                running: formData.running,
                soccer: formData.soccer,
                volleyball: formData.volleyball
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
        <div classname = "onboarding">
            <section className = "registerSection">
                <div className = "homeSectionContentBox">
                    <div className = "homeSectionContent">
                        <h1>PROFILE</h1>
                    </div>
                </div>
            </section>

            <section>
                <label htmlFor="sports-pref">Sports Preferences</label>
                <div>
                    <input 
                    type="checkbox"
                    id="baseball"
                    name="baseball"
                    onChange={handleChange}
                    checked={formData.baseball}
                    />
                    <label>Baseball</label>
                    <input 
                    type="checkbox"
                    id="basketball"
                    name="basketball"
                    onChange={handleChange}
                    checked={formData.basketball}
                    />
                    <label>Basketball</label>
                    <input 
                    type="checkbox"
                    id="cycling"
                    name="cycling"
                    onChange={handleChange}
                    checked={formData.cycling}
                    />
                    <label>Cycling</label>
                    <input 
                    type="checkbox"
                    id="football"
                    name="football"
                    onChange={handleChange}
                    checked={formData.football}
                    />
                    <label>Football</label>
                    <input 
                    type="checkbox"
                    id="golf"
                    name="golf"
                    onChange={handleChange}
                    checked={formData.golf}
                    />
                    <label>Golf</label>
                    <input 
                    type="checkbox"
                    id="tableTennis"
                    name="tableTennis"
                    onChange={handleChange}
                    checked={formData.tableTennis}
                    />
                    <label>Table Tennis</label>
                    <input 
                    type="checkbox"
                    id="tennis"
                    name="tennis"
                    onChange={handleChange}
                    checked={formData.tennis}
                    />
                    <label>Tennis</label>
                    <input 
                    type="checkbox"
                    id="running"
                    name="running"
                    onChange={handleChange}
                    checked={formData.running}
                    />
                    <label>Running</label>
                    <input 
                    type="checkbox"
                    id="soccer"
                    name="soccer"
                    onChange={handleChange}
                    checked={formData.soccer}
                    />
                    <label>Soccer</label>
                    <input 
                    type="checkbox"
                    id="volleyball"
                    name="volleyball"
                    onChange={handleChange}
                    checked={formData.volleyball}
                    />
                    <label>Volleyball</label>
                </div>
            </section>
            <div>
                <button onClick={editPref}>Submit</button>
            </div>
        </div>
    );
}


export default EditPreferences