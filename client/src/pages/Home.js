import './Home.css';
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

//Home Page
function Home() {
    // TODO: how do i access any of the data in the database bruh
        // I want to access user data, then home button directs either to onboarding or swipe
    const firstName = localStorage.getItem("firstname");
    
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
        navigate("/onboarding");
    }
    const goToDashboard = () => {
        navigate("/swipe");
    }

    return (
        <section id = "homeSection" className = "homeSection">

            <div className = "homeSectionImg">
                <img src = "./img/logo-colored.png" alt = "Logo"/>
            </div>
            
            <div className =  "homeSectionContentBox">

                <div>
                    {!cookies.access_token ?
                    <div>
                        <div classname = "homeSectionContent">
                            <p className = "homeSectionTitle">Hey, we're Courts.</p>
                            <p className = "homeSectionDescription">
                            “Courts” is a website designed to aid students at the University of Florida
                            in finding other students with similar sports interests and bringing them together in the real world.
                            </p>
                        </div>
                        <button className = "btn btn-primary" onClick = {register}>Join Courts now!</button>
                    </div> :
                    <div>
                        {/*TODO: I want to access data from database, for now this DOES NOT WORK */}
                        <div>
                            {!firstName ?
                            <div>
                                <div classname = "homeSectionContent">
                                    <p className = "homeSectionTitle">Ready to get started?</p>
                                    <p className = "homeSectionDescription">Create your profile and connect with potential teammates.</p>
                                </div>
                                <button className = "btn btn-primary" onClick={goToPreferences}>{localStorage.getItem("userID")}: Create Profile</button>
                            </div> :
                            <div>
                                <div classname = "homeSectionContent">
                                    <p className = "homeSectionTitle">Start swiping!</p>
                                    <p className = "homeSectionDescription">Head over to the dashboard and start swiping.</p>
                                </div>
                                <button className = "btn btn-primary" onClick={goToDashboard}>Dashboard</button>
                            </div>
                            }
                        </div>
                    </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default Home;