import React, {useEffect, useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import toastOptions from "../config/toastOptions";
import axios from "axios";
import styled from "styled-components";
import {authenticationRoute, setAvatarRoute} from "../config/APIRoutes";
import loader from "../assets/loader.gif";
import {useNavigate} from "react-router-dom";


function SetAvatar() {
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const navigate = useNavigate();


    const api = "https://api.multiavatar.com/45678945";

    useEffect(() => {
            const authenticate = async () => {
                const {data} = await axios.get(authenticationRoute, {withCredentials: true})
                if (!data.status) navigate("/login")
            }
            authenticate();
    }, []);
    const setProfile = async () => {
        if (selectedAvatar === undefined) toast("Please select a profile picture", toastOptions);
        else {
            const userInfo = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${userInfo._id}`, {
                image: avatars[selectedAvatar]
            })
            if (data.isSet) {
                userInfo.isAvatarImageSet = true;
                userInfo.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(userInfo));
                navigate("/");
            }
        }
    }

    useEffect(() => {
        const data = [];
        const fetchData = async () => {
            for (let i = 0; i < 4; ++i) {
                const {image} = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=N6SmBXP4CYz8MG`);

                data.push(image.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        };
        fetchData();

    }, []);
    if (isLoading === true)
        return (
            <StyledContainer>
                <div className="loader">
                    <img src={loader} alt="Loading"/>
                </div>
            </StyledContainer>
        )
    else
        return (
            <StyledContainer>
                <div className="title-container">
                    <h1>Pick an avatar</h1>
                </div>
                <div className="avatars">
                    {avatars.map((avatar, index) => (
                        <div className={`avatar ${index === selectedAvatar ? 'selected' : ""}`} key={index}>
                            <img
                                src={`data:image/svg+xml;base64,${avatar}`}
                                alt="avatar"
                                onClick = {() => setSelectedAvatar(index)}
                            />
                        </div>
                    ))}
                </div>
                <button className="submit-btn" onClick={setProfile}> Set as Profile Picture</button>
            </StyledContainer>
        );
}

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: #131324;

    .title-container {
        color: white;
    }

    .avatars {
        display: flex;
        flex-direction: row;
    }

    .avatar {
        border-radius: 100%;
        height: 5rem;
        width: 5rem;
        margin: 1.5rem;

        img {
            padding: 0.3rem;
        }
    }

    .selected {
        border: 0.34em solid #4e0eff;
    }

    .submit-btn {
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        margin-top: 1.5rem;
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
    .loader{
        display: flex;
        justify-content: center;
        align-items: center;

        img{
            height: 10rem;
            width: 10rem;
        }
    }
`;
export default SetAvatar;
