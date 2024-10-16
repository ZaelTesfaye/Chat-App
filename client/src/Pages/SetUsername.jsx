import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {authenticationRoute, checkUserNameRoute, updateUsernameRoute} from "../config/APIRoutes";
import {debounce} from "../Utils/Debounce";
import toastOptions from "../config/toastOptions";
import {AuthContext} from "../context/authContext";

export default function SetUsername() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [label, setLabel] = useState("");
    const [usernameStatus, setUsernameStatus] = useState(undefined);
    const [input, setInput] = useState("");
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    useEffect(() => {
            const authenticate = async () => {
                const {data} = await axios.get(authenticationRoute, {withCredentials: true})
                if (!data.status) navigate("/")

            }
            authenticate();
    }, []);

    const handleChange = debounce((name) => {
        setUsername(name);
        checkUsername(name)
    }, 300);
    const validateForm = () => {
        if (username.length < 4) {
            toast.error(
                "username should be greater than 4 characters.",
                toastOptions
            );
            return false;
        }
        if (!usernameStatus) {
            toast.error(
                "username is taken",
                toastOptions
            );
            return false;
        }
        return true;
    };

    const checkUsername = async (username) => {
        if (username.length > 3) {
            const lowerCaseUsername = username.toLowerCase();
            const {data} = await axios.post(checkUserNameRoute, {username: lowerCaseUsername});
            setUsernameStatus(data.status);
            setLabel(data.msg);

        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm() ) {
            const lowerCaseUsername = username.toLowerCase();
            const {data} = await axios.post(updateUsernameRoute, {
                username: lowerCaseUsername,
            }, {withCredentials: true});
            if (data.status) {
                localStorage.setItem(
                    "chat-app-user",
                    JSON.stringify(data.user)
                );
                !data.user.isAvatarImageSet? navigate("/avatar") : navigate("/");
            }
        }
    };

    return (
        <FormContainer>
            <form action="" onSubmit={(event) => handleSubmit(event)}>
                <span> Check Username Availability</span>
                <div className="row">
                    <input className={`${
                        usernameStatus ? "success" : usernameStatus !== undefined ? "danger" : ""
                    }`} type="text" placeholder="Username" name="username"
                           onChange={(e) => handleChange(e.target.value)}
                           min="3"
                    />
                    <label htmlFor=""
                           className={`${usernameStatus ? "success" : usernameStatus !== undefined ? "danger" : ""}`}>
                        {label}
                    </label>
                </div>
                <button type="submit" className="btn">
                    Set Username
                </button>
            </form>
        </FormContainer>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;

    .row {
        label {
            display: block;
            margin: 10px 0 0 5px;
            transition: 0.3s ease-in-out;
            height: 0.5rem;
        }

        label.success {
            color: #39ff14;
        }

        label.danger {
            color: #ff3131;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 5rem;
    }

    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        transition: 0.3s ease-in-out;

        &:focus {
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }

    .success {
        border-color: #39ff14;

        &:focus {
            border-color: #39ff14;
        }
    }

    .danger {
        border-color: #ff3131;

        &:focus {
            border-color: #ff3131;
        }
    }

    .btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;

        &:hover {
            background-color: #4e0eff;
        }
    }

    span {
        color: white;
        text-transform: uppercase;
    }
`;
