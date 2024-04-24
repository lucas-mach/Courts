import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditPreferences() {
    const username = localStorage.getItem("userID");
    const navigate = useNavigate();

    //set initial data to empty
    const [ThisUser, setThisUser] = useState({
        username: username,
        first_name: "",
        age: "",
        sex:'',
        url: 'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png',
        about: '',
        college: "",
        baseball: true,
        basketball: false,
        cycling: false,
        football: false,
        golf: false,
        tableTennis: false,
        tennis: false,
        running: false,
        soccer: false,
        volleyball: false
    });
    
    const [isEditing, setIsEditing] = useState(false);

    //upon page loading, get user profile data if exists
    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await axios.get("http://localhost:3001/editPreferences", {
                    params: { username : username }
                });
                setThisUser(res.data);
                console.log("User: ", res.data);
            } catch (err) {
                console.error(err);
            }
            return { ThisUser };
        }
        getProfile();
    },[])

    //handle changing user profile info
    const handleChange =(e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        setThisUser({
            ...ThisUser, 
            [name] : value
        })
    }

    //send info to the backend for updating
    const editPref = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/editPreferences", 
            {   username: ThisUser.username, 
                first_name: ThisUser.first_name,
                sex: ThisUser.sex,
                age: ThisUser.age,
                url: ThisUser.url,
                about: ThisUser.about,
                college: ThisUser.college,
                baseball: ThisUser.baseball,
                basketball: ThisUser.basketball,
                cycling: ThisUser.cycling,
                football: ThisUser.football, 
                golf: ThisUser.golf,
                tableTennis: ThisUser.tableTennis,
                tennis: ThisUser.tennis,
                running: ThisUser.running,
                soccer: ThisUser.soccer,
                volleyball: ThisUser.volleyball
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
                        placeholder= {"Your First Name"}
                        required={true}
                        value={ThisUser.first_name}
                        onChange={handleChange}
                        />
                    ) : (
                        <b>{ThisUser.first_name}</b>
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
                        value={ThisUser.college}
                        onChange={handleChange}
                    />
                    ) : (
                        <b>{ThisUser.college}</b>
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
                        value={ThisUser.age}
                        onChange={handleChange}
                    />
                    ) : (
                        <b>{ThisUser.age}</b>
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
                            checked={ThisUser.sex === 'Male'}
                        />
                        <label htmlFor="man-gender-identity">Male</label>
                        <input
                            id="woman-gender-identity"
                            type="radio"
                            name="sex"
                            value="Female"
                            onChange={handleChange}
                            checked={ThisUser.sex === 'Female'}
                        />
                        <label htmlFor="woman-gender-identity">Female</label>
                        <input
                            id="more-gender-identity"
                            type="radio"
                            name="sex"
                            value="Other"
                            onChange={handleChange}
                            checked={ThisUser.sex === 'Other'}
                        />
                        <label htmlFor="more-gender-identity">Other</label>
                    </div>
                    ) : (
                        <b>{ThisUser.sex}</b>
                    )}
                    </label>
                    
                    <label>Sports Preference:{" "}
                        <div>
                            <input 
                            type="checkbox"
                            id="baseball"
                            name="baseball"
                            onChange={handleChange}
                            checked={ThisUser.baseball}
                            />
                            <label>Baseball</label>
                            <input 
                            type="checkbox"
                            id="basketball"
                            name="basketball"
                            onChange={handleChange}
                            checked={ThisUser.basketball}
                            />
                            <label>Basketball</label>
                            <input 
                            type="checkbox"
                            id="cycling"
                            name="cycling"
                            onChange={handleChange}
                            checked={ThisUser.cycling}
                            />
                            <label>Cycling</label>
                            <input 
                            type="checkbox"
                            id="football"
                            name="football"
                            onChange={handleChange}
                            checked={ThisUser.football}
                            />
                            <label>Football</label>
                            <input 
                            type="checkbox"
                            id="golf"
                            name="golf"
                            onChange={handleChange}
                            checked={ThisUser.golf}
                            />
                            <label>Golf</label>
                            <input 
                            type="checkbox"
                            id="tableTennis"
                            name="tableTennis"
                            onChange={handleChange}
                            checked={ThisUser.tableTennis}
                            />
                            <label>Table Tennis</label>
                            <input 
                            type="checkbox"
                            id="tennis"
                            name="tennis"
                            onChange={handleChange}
                            checked={ThisUser.tennis}
                            />
                            <label>Tennis</label>
                            <input 
                            type="checkbox"
                            id="running"
                            name="running"
                            onChange={handleChange}
                            checked={ThisUser.running}
                            />
                            <label>Running</label>
                            <input 
                            type="checkbox"
                            id="soccer"
                            name="soccer"
                            onChange={handleChange}
                            checked={ThisUser.soccer}
                            />
                            <label>Soccer</label>
                            <input 
                            type="checkbox"
                            id="volleyball"
                            name="volleyball"
                            onChange={handleChange}
                            checked={ThisUser.volleyball}
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
                        value={ThisUser.about}
                        onChange={handleChange}
                    />
                    ) : (
                        <b>{ThisUser.about}</b>
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
                        <b>{ThisUser.url}</b>
                    )}
                    </label>
                    <div className = "photo-container">
                        {ThisUser.url && <img src={ThisUser.url} alt="Profile Pic Preview"/>}
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