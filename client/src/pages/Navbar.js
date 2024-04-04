import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Navbar()
{
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/");
    }

    return (
        <nav className = "navbar">
            <div className = "siteTitle">
                <a href = "/">
                    <img src = "./img/logo-wheat.png" alt = "Site Logo"/>
                </a>
            </div>
            <ul>
                <li>
                    <a href = "/aboutus"> About Us</a>
                </li>
                <li>
                    <a href = "/onboarding"> Test </a>
                </li>

                {!cookies.access_token ?  
                    <li>
                        <a href = "/register">Register</a>
                    </li> :
                    <div>
                        <ul>
                        <li>
                            <a href = "/editPreferences">
                            {localStorage.getItem("userID")}: Profile Edit
                            </a>
                        </li>
                        <li>
                            <a href = "/" onClick = {logout}>Logout</a>
                        </li>
                        </ul>
                    </div>
                }
            </ul>
        </nav>
    )
}