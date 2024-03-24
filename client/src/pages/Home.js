import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
//Home Page
function Home() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const naviagte = useNavigate();
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        naviagte("/login");
    }


    return (
        <div>
            <h1>Home Page :D</h1>
            {!cookies.access_token ?  <a href="http://localhost:3000/register">Register</a> : <button onClick={logout}>Logout</button>}
        </div>
    );
}

export default Home;