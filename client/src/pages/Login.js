import React from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";

function Login() {
    //State containing our users
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Api call to backend, runs when webpage opens
  const [_, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:3001/login", {username: username, password: password});
        setCookies("access_token", response.data.token);
        if (!response.data.userID) {
            alert("Wrong username/password")
        } else {
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
        }
        
        
    }
    catch (err){
        console.error(err);
    }
  };


    return (
        <div>
            <h2>Login Page</h2>

            <a href="http://localhost:3000/" class="home">Home</a>   

            <div class="credentials">
                <p>Please enter your username and password.</p>
                <input
                    type="text"
                    placeholder="username..."
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                        }}
                />
                <input 
                    type="password" 
                    placeholder="password..."
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                        }}
                />
                <button onClick={loginUser}>
                    Login
                </button>

                <div>
                    <p>Don't have an account?</p>
                    <a href="http://localhost:3000/register">Create An Account</a>
                </div>
            </div>
        </div>
    );
}

export default Login;