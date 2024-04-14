import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditPreferences() {
    const username = localStorage.getItem("userID");
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    // change to contain data from database
    const [formData, setFormData] = useState({
        username: username,
        first_name: "",
        age: "",
        sex:'Male',
        url: 'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png',
        about: '',
        college: "",
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

    const editPref = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/editPreferences", 
            {   username: formData.username, 
                first_name: formData.first_name,
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
            alert("changes saved");

        }
        catch(err) {
            console.error(err);
        }
    };

    return (
        <div className = "onboarding">
            <section id = "Register" className = "registerSection">
            <div className = "homeSectionContentBox">
                <div className = "homeSectionContent">
                    <h1>PROFILE</h1>
                </div>
            </div>
            </section>


            <form onSubmit= {(e) => {
                e.preventDefault();
                setIsEditing(!isEditing);
            }}>
                <section>
                <button className = "btn btn-as-text" type="submit">Click to {isEditing ? "Save" : "Edit"} Profile</button>

                    <label>First name:{" "}
                    {isEditing ? (
                        <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        placeholder= {formData.first_name}
                        required={true}
                        value={formData.first_name}
                        onChange={handleChange}
                        />
                    ) : (
                        <b>{formData.first_name}</b>
                    )}
                    </label>

                    <label>College:{" "}
                    {isEditing ? (
                        <input
                        id="college"
                        type="text"
                        name="college"
                        placeholder="Name of Institution"
                        required={true}
                        value={formData.college}
                        onChange={handleChange}
                    />
                    ) : (
                        <b>{formData.college}</b>
                    )}
                    </label>

                    <label>Age:{" "}
                    {isEditing ? (
                        <input
                        id="age"
                        type="number"
                        name="age"
                        placeholder="18"
                        required={true}
                        value={formData.age}
                        onChange={handleChange}
                    />
                    ) : (
                        <b>{formData.age}</b>
                    )}
                    </label>

                    <label>Gender:{" "}
                    {isEditing ? (
                        <div className="multiple-input-container">
                        <input
                            id="man-gender-identity"
                            type="radio"
                            name="sex"
                            value="Male"
                            onChange={handleChange}
                            checked={formData.sex === 'Male'}
                        />
                        <label htmlFor="man-gender-identity">Male</label>
                        <input
                            id="woman-gender-identity"
                            type="radio"
                            name="sex"
                            value="Female"
                            onChange={handleChange}
                            checked={formData.sex === 'Female'}
                        />
                        <label htmlFor="woman-gender-identity">Female</label>
                        <input
                            id="more-gender-identity"
                            type="radio"
                            name="sex"
                            value="Other"
                            onChange={handleChange}
                            checked={formData.sex === 'Other'}
                        />
                        <label htmlFor="more-gender-identity">Other</label>
                    </div>
                    ) : (
                        <b>{formData.sex}</b>
                    )}
                    </label>
                    
                    <label>Sports Preference:{" "}
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
                    </label>

                    <label>About Me:{" "}
                    {isEditing ? (
                        <input 
                        id="about"
                        type="text"
                        name="about"
                        required={true}
                        placeholder="Write a brief bio!"
                        value={formData.about}
                        onChange={handleChange}
                    />
                    ) : (
                        <b>{formData.about}</b>
                    )}
                    </label>
                </section>

                <section>
                <label>Profile Picture URL:{" "}
                    {isEditing ? (
                        <input
                        type = "url"
                        name = "url"
                        id = "url"
                        onChange={handleChange}
                        required={false}
                        />
                    ) : (
                        <b>{formData.url}</b>
                    )}
                    </label>
                    <div className = "photo-container">
                        {formData.url && <img src={formData.url} alt="Profile Pic Preview"/>}
                    </div>
                </section>
                <div>
            {isEditing ? (
                <p></p>
                    ) : (
                        <button className = "btn btn-primary" onClick = {editPref}> Save Changes </button>
                    )}
            </div>

            </form>
            
        </div>
    );
}


export default EditPreferences