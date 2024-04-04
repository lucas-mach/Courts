import { useState } from 'react'
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
    const username = localStorage.getItem("userID");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: username,
        first_name: "",
        age: "",
        sex:'man',
        url: '',
        about: '',
        matches: [],
        football: false,
        basketball: false,
        tennis: false
    })

    const handleSubmit = async (e) => {
        alert("registration completed")
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/onboarding", { formData })
            const success = response.statusCode === 200
            if (success) navigate('/')
        }
        catch(err) {
            console.error(err);
        }
    }

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
                    <p className = "sectionTitle">
                        Edit Preferences
                    </p>
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
                            value="man"
                            onChange={handleChange}
                            checked={formData.sex === 'man'}
                        />
                        <label htmlFor="man-gender-identity">Male</label>
                        <input
                            id="woman-gender-identity"
                            type="radio"
                            name="sex"
                            value="woman"
                            onChange={handleChange}
                            checked={formData.sex === 'woman'}
                        />
                        <label htmlFor="woman-gender-identity">Female</label>
                        <input
                            id="more-gender-identity"
                            type="radio"
                            name="sex"
                            value="more"
                            onChange={handleChange}
                            checked={formData.sex === 'more'}
                        />
                        <label htmlFor="more-gender-identity">Other</label>
                    </div>

                    <label htmlFor="sports-pref">Sports Preferences</label>
                    <div>
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
                        id="basketball"
                        name="basketball"
                        onChange={handleChange}
                        checked={formData.basketball}
                        />
                        <label>Basketball</label>
                        <input 
                        type="checkbox"
                        id="tennis"
                        name="tennis"
                        onChange={handleChange}
                        checked={formData.tennis}
                        />
                        <label>Tennis</label>
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
                        required={true}
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