import React from "react";
import { useState } from "react";
import axios from "axios";



function Register() {
    //State containing our users
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Api call to backend, runs when webpage opens
  

  const createUser = async (event) => {
    event.preventDefault();
    try {
        await axios.post("http://localhost:3001/register", {username: username, password: password});
        alert("registration completed");
    }
    catch (err) {
        console.error(err);
    }
  };


    return (
        <div>
            <h1>Register Page</h1>
            <a href="http://localhost:3000/">Home</a>
            <div>
                <input
                    type="text"
                    placeholder="username..."
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                        }}
                />
                <input 
                    type="text" 
                    placeholder="password..."
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                        }}
                />
                <button onClick={createUser}>
                    Create User
                </button>
                <div><a href="http://localhost:3000/login">Login</a></div>
            </div>
            
            
        </div>
    );
}

export default Register;