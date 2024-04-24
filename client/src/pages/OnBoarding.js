import { useState } from 'react'
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Profile initial creation for the user
const OnBoarding = () => {
    const username = localStorage.getItem("userID");
    const navigate = useNavigate();

    //Initial values
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

    //submit changed data when finished
    const handleSubmit = async (e) => {        
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/onboarding", { 
            username: formData.username,
            first_name : formData.first_name,
            age: formData.age,
            sex : formData.sex,
            url : formData.url,
            about : formData.about,
            college : formData.college,
            baseball : formData.baseball,
            basketball : formData.basketball,
            cycling : formData.cycling,
            football : formData.football,
            golf: formData.golf,
            tableTennis: formData.tableTennis,
            tennis : formData.tennis,
            running : formData.running,
            soccer : formData.soccer,
            volleyball : formData.volleyball
            })
        }
        catch(err) {
            console.error(err);
        }
        alert("registration completed")
        navigate('/swipe')  // navigate to swipe page when finished creating profile
    }
    // Change formdata and update user input 
    const handleChange =(e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    console.log(formData)


    return (
        <div className = "onboarding">
            <section id = "Register" className = "registerSection">
            <div className = "homeSectionContentBox">
                <div className = "homeSectionContent">
                    <h1>PROFILE</h1>
                </div>
            </div>
            </section>

            <form onSubmit={handleSubmit}>
                <section>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        required={true}
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <label>College</label>
                    <input
                        id="college"
                        type="text"
                        name="college"
                        placeholder="Name of Institution"
                        required={true}
                        value={formData.college}
                        onChange={handleChange}
                    />
                    <label>Age</label>
                    <input
                        id="age"
                        type="number"
                        name="age"
                        placeholder="18"
                        required={true}
                        value={formData.age}
                        onChange={handleChange}
                    />

                    <label >Gender</label>
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

                    <label htmlFor="about">About Me</label>
                    <input 
                        id="about"
                        type="text"
                        name="about"
                        required={true}
                        placeholder="Write a brief bio!"
                        value={formData.about}
                        onChange={handleChange}
                    />
                    <input className = "btn btn-primary"
                        type = "submit"
                    />
                </section>

                <section>
                <label htmlFor="about">Profile Picture URL</label>
                    <input
                        type = "url"
                        name = "url"
                        id = "url"
                        onChange={handleChange}
                        required={false}
                    />
                    <div className = "photo-container">
                        {formData.url && <img src={formData.url} alt="Profile Pic Preview"/>}
                    </div>
                </section>
            </form>
        </div>
        
    )
}
export default OnBoarding