import React, {useContext} from 'react';
import styled from "styled-components";
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import {BiPowerOff} from "react-icons/bi";
import { logoutRoute } from "../config/APIRoutes";
import {AuthContext} from "../context/authContext";

function Logout() {
    const navigate = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const handleClick = async () =>{
        const id = await JSON.parse(
            localStorage.getItem("chat-app-user")
        )._id;
        const data = await axios.get(`${logoutRoute}/${id}`, {withCredentials: true});
        if (data.status === 200) {
            localStorage.clear();
            setIsAuthenticated(false);
            navigate("/login");
        }
    }
    return (
        <Button onClick={handleClick}>
            <BiPowerOff />
            <p>Logout</p>
        </Button>
    );
}

const Button = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    color: #21056c;
    font-weight: bold;
    text-decoration: none;
    gap: 5px;

    p:hover {
        color: #d1d0d5;
    }

    svg {
        font-size: 1.3rem;
        color: #930606;
    }
`
export default Logout;