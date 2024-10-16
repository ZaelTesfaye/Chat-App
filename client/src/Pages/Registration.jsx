import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import toastOptions from "../config/toastOptions";
import Logo from "../assets/logo.png";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {authenticationRoute, registerRoute} from "../config/APIRoutes";
import LoginButtons from '../Components/loginButtons';
import {AuthContext} from "../context/authContext";

function Registration() {
    const navigate = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [isSubmitted, setIsSubmitted] = useState(false)
    useEffect(() => {
        if (isAuthenticated) navigate("/");
        const authenticate = async () => {
            const {data} = await axios.get(authenticationRoute, {withCredentials: true})
            if (data.status) {
                setIsAuthenticated(true);
                navigate("/")

            }
        }
        authenticate();
    }, []);

    const [formInput, updateFormInput] = useState({
        username: "",
        email: "",
        password: "",
        confirm: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {username, email, password} = formInput;
        const lowerCaseUsername = username.toLowerCase();
        if (handleValidation()) {
            const {data} = await axios.post(registerRoute, {
                username: lowerCaseUsername,
                email,
                password
            }, {withCredentials: true})

            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/avatar");
            } else {
                toast.error(data.message, toastOptions);
                setIsSubmitted(false);
            }
        }
        else {
            setIsSubmitted(false)
        }
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
        setIsSubmitted(true)
        if (formInput.confirm !== formInput.password) {
            toast.error("Password and password confirmation don't match", toastOptions);
            return false;
        } else if (formInput.email === "") {
            toast.error("Email is required", toastOptions)
            return false;
        } else if (formInput.username.length < 4) {
            toast.error("Username should contain at least 4 characters", toastOptions);
            return false;
        } else if (formInput.password.length < 4) {
            toast.error("Password should contain at least 4 characters", toastOptions);
            return false;
        } else
            return true;
    }

    return (
        <div className="registration">
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className="brand">
                        <img src={Logo} alt="Brand"/>
                        <h1>Snappy</h1>
                    </div>

                    <input type="text" placeholder="Username" name="username" onChange={handleChange} value={formInput.username}/>
                    <input type="email" placeholder="Email" name="email" onChange={handleChange} value={formInput.email}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} value={formInput.password}/>
                    <input type="password" placeholder="Confirm Password" name="confirm" onChange={handleChange} value={formInput.confirm}/>
                    <button className="btn" type="submit" disabled={isSubmitted} >Create Account</button>
                    <LoginButtons/>
                    <span>Already have an account? <Link to="/Login"> Login</Link> </span>
                </form>
            </FormContainer>
        </div>
    )
}

export default Registration;

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

        .btn {
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
        }/*
        .opt {
            color: currentColor;
            background-color: #00bbff;

            svg {
                margin-right: 12px;
            }
        }
        */
    }`;

