import './Home.css';
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

//Home Page
function Home() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const naviagate = useNavigate();
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        naviagate("/login");
    }
    const goToPreferences = () => {
        naviagate("/editPreferences")
    }
 


    return (
        <div>
            <h1>Courts</h1>
            

            <div class="navbar">
                {!cookies.access_token ?  <a href="http://localhost:3000/register">Register</a> : <div>
                    <button class="logout-button" onClick={logout}>Logout</button> 
                    <button onClick={goToPreferences}>Edit Preferences</button>
                    <div>
                       {localStorage.getItem("userID")}

                    </div>
                </div>}
                <a href="http://localhost:3000/aboutus">About Us</a>
            </div>

        </div>
    );
}

export default Home;