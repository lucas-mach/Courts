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

  // Call backend api to attempt to log in the user with information given from the front end
  const loginUser = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:3001/login", {username: username, password: password});
        setCookies("access_token", response.data.username);
        if (response.data.username !== username) {
            alert("Wrong username/password")
        } else {
            window.localStorage.setItem("userID", response.data.username);
            navigate("/");
        }
    }
    catch (err){
        console.error(err);
    }
  };

    return (
        <section id = "Login" className = "registerSection">
            <div className = "homeSectionContentBox">
                    <div className = "homeSectionContent">
                        <p className = "sectionTitle">
                            Login Page
                        </p>
                        <h1>
                            LOG IN
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
                    <button className = "btn btn-primary" onClick={loginUser}>
                        Login
                    </button>
                    <div>
                        <p className = "text-md">
                            Don't have an account?
                        </p>
                        <a href="/register">
                            Create An Account
                        </a>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;