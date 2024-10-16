import React, {useContext, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {allUsersRoute, authenticationRoute, host, userDataRoute} from "../config/APIRoutes";
import Contacts from "../Components/Contacts";
import Welcome from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";
import {io} from "socket.io-client";
import {AuthContext} from "../context/authContext";
import {useQuery} from "@tanstack/react-query";

function Chat() {

    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const setUser = async () => {
        let userData = JSON.parse(localStorage.getItem("chat-app-user"));

        if (!userData) {
            const {data} = await axios.get(userDataRoute, {withCredentials: true});
            localStorage.setItem("chat-app-user", JSON.stringify(data));
            userData = data;
        }
        setCurrentUser(userData);
    };

    useEffect(() => {
        const authenticate = async () => {
            if (isAuthenticated) {
                await setUser();
            } else {
                const {data} = await axios.get(authenticationRoute, {withCredentials: true});
                if (data.status) {
                    await setUser();
                    setIsAuthenticated(true);
                } else {
                    navigate("/login");
                }
            }
        };
        authenticate();
    }, []);

    useEffect(() => {
        if (currentUser && !currentUser.isAvatarImageSet) {
            navigate("/avatar");
        }

    }, [currentUser, navigate]);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    const {data, error, isLoading} = useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            return data;
        },
        enabled: !!(currentUser && currentUser.isAvatarImageSet && currentUser.username),
    });

    useEffect(() => {
        if (data) {
            setContacts(data);
        }
    }, [data]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                {currentUser && currentChat === undefined ? (
                    <Welcome currentUser={currentUser} />
                ) : (
                    <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                )}
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #131324;

    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 40% 60%;
        }
    }
`;

export default Chat;
