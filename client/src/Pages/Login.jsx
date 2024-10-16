import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {authenticationRoute, loginRoute} from "../config/APIRoutes";
import LoginButtons from '../Components/loginButtons';
import {AuthContext} from "../context/authContext";
import toastOptions from "../config/toastOptions";

function Login() {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false)
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    useEffect(() => {
        if (isAuthenticated) navigate("/");
        else {
            const authenticate = async () => {
                const {data} = await axios.get(authenticationRoute, {withCredentials: true})
                if (data.status) {
                    setIsAuthenticated(true);
                    console.log("Navigating to chat page")
                    navigate("/")
                }
            }
            authenticate();
        }
    }, []);

    const [formInput, updateFormInput] = useState({
        username: "",
        email: "",
        password: "",
    })


    async function handleSubmit(event) {
        const {username, password} = formInput;
        const lowerCaseUsername = username.toLowerCase();
        event.preventDefault();
        if (handleValidation()) {
            const {data} = await axios.post(loginRoute, {
                username: lowerCaseUsername,
                password
            }, {withCredentials: true})

            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.userData));
                navigate("/");
            } else {
                toast.error(data.message, toastOptions);
                setIsSubmitted(false);
            }
        } else setIsSubmitted(false);
    }

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        updateFormInput((prevState) => ({
                ...prevState,
                [name]: value
            })
        )
    }

    function handleValidation() {
        setIsSubmitted(true);
        const {username, password} = formInput;
        if (username.length < 4) {
            toast.error("Username should contain at least 4 characters", toastOptions);
            return false;
        } else if (password.length < 4) {
            toast.error("Password should contain at least 8 characters", toastOptions);
            return false;
        } else
            return true;
    }

    return (
        <div className="registration">
            <FormContainer>
                <form action="" onSubmit={handleSubmit}>
                    <div className="brand">
                        <img src={Logo} alt="Brand"/>
                        <h1>Snappy</h1>
                    </div>

                    <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    <button className="mainBtn" disabled={isSubmitted} type="submit">Login</button>
                    <LoginButtons/>
                    <span>Don't have an account? <Link to="/Register">Sign Up</Link> </span>
                </form>
            </FormContainer>
        </div>
    )
}

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #131324;

    .brand {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        img {
            height: 5rem;
            width: 5rem;
        }

        h1 {
            text-transform: capitalize;
            font-size: 25px;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;

        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;

            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }

        .mainBtn {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;

            &:hover {
                background-color: #4e0eff;
            }
        }

        span {
            color: white;
            text-transform: uppercase;

            :hover {
                color: #5031b2;
            }

            a {
                color: #4e0eff;
                font-weight: bold;
                text-decoration: none;
            }
        }
    }`;

export default Login;