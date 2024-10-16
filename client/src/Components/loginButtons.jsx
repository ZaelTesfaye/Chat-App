import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {BsGoogle} from "react-icons/bs";
import {googleAuthRoute} from "../config/APIRoutes";


export default function LoginButtons() {


    return (
        <SocialLoginContainer>
                <Link className={"button"} to={googleAuthRoute}>
                    <BsGoogle/>
                    <p>Sign in with Google</p>
                </Link>
        </SocialLoginContainer>

    );
}

const SocialLoginContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    background-color: transparent;

    .button {
        background-color: transparent;
        border: 0.1rem solid #4e0eff;
        font-size: 1.5rem;
        padding: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        gap: 20px;
        text-decoration: none;
        

        &:hover {
            background-color: #4e0eff;
        }
    }
`;