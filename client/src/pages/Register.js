import React from "react";
import { useState } from "react";
import axios from "axios";



function Register() {
    //State containing our users
  const [listofUsers, setlistofUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Api call to backend, runs when webpage opens
  

  const createUser = () => {
    axios.post("http://localhost:3001/createUser", {username: username, password: password}).then((response) => {
      setlistofUsers([...listofUsers, {username: username, password: password}])
    });
  };


    return (
        <div>
            <h1>Register Page</h1>
            <a href="http://localhost:3000/">Home</a>
            <div>
                <input 
                    type="text"
                    placeholder="username..."
                    onChange={(event) => {
                        setUsername(event.target.value);
                        }}
                />
                <input 
                    type="text" 
                    placeholder="password..."
                    onChange={(event) => {
                        setPassword(event.target.value);
                        }}
                />
                <button onClick={createUser}>
                    Create User
                </button>
            </div>
            
            
        </div>
    );
}

export default Register;