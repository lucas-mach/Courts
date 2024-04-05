import './Home.css';
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

//Home Page
function Home() {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const register = () => {
        navigate("/register");
    }
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/login");
    }
    const goToPreferences = () => {
        navigate("/editPreferences");
    }

    return (
        <section id = "homeSection" className = "homeSection">
            <div className = "homeSectionImg">
                <img src = "./img/logo-colored.png" alt = "Logo"/>
            </div>
            
            <div className =  "homeSectionContentBox">
                <div classname = "homeSectionContent">
                    <p className = "homeSectionTitle">
                        Hey, we're Courts.
                    </p>
                    <p className = "homeSectionDescription">
                    “Courts” is a website designed to aid students at the University of Florida
                    in finding other students with similar sports interests and bringing them together in the real world.
                    </p>
                </div>
                <div>
                    {!cookies.access_token ?  
                    <button className = "btn btn-primary" onClick = {register}>
                        Join Courts now!
                    </button> :
                    <div>
                        <button className = "btn btn-primary" onClick={goToPreferences}>
                            {localStorage.getItem("userID")}: Profile Edit
                        </button>
                    </div>}
                </div>
            </div>
        </section>
    );
}

export default Home;