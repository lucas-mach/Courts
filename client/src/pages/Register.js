import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Register() {
    const navigate = useNavigate();

    //State containing our users
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Api call to backend, runs when webpage opens
  
    // Attempts to create a new user in our database
  const createUser = async (event) => {
    event.preventDefault();
    try {
        await axios.post("http://localhost:3001/register", {username: username, password: password});
        alert("registration completed");
        navigate("/login");
    }
    catch (err) {
        console.error(err);
    }
  };


    return (
        <section id = "Register" className = "registerSection">
            <div className = "homeSectionContentBox">
                    <div className = "homeSectionContent">
                        <p className = "sectionTitle">
                            Registration
                        </p>
                        <h1>
                            REGISTER
                        </h1>
                    </div>
                <form className = "loginContainer">
                    <div className = "container">
                        <input
                        type= "text"
                        className = "loginInput text-md"
                        placeholder= "username..."
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                            }}
                        />
                        <input 
                        type="text" 
                        className = "loginInput text-md"
                        placeholder="password..."
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                            }}
                        />
                    </div>
                    <button className = "btn btn-primary" onClick={createUser}>
                        Create User
                    </button>
                    <div>
                        <p className = "text-md">
                            Already have an account?
                        </p>
                        <a href="/login">
                            Login
                        </a>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Register;