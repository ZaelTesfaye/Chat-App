import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import logo from "../assets/logo.png"
import {Link} from "react-router-dom"
import Logout from "./Logout";
import ProfileOptions from "./profileOptions";

function Contacts({contacts, currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }
    return (
        <>
            {currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                        <div className="menu"><ProfileOptions/></div>
                        <div className="brands">
                            <img src={logo} alt="Brand"/>
                            <h3>Snappy</h3>
                        </div>

                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div className={`contact ${index === currentSelected ? "selected" : ""}  `} key={index}
                                     onClick={() => {
                                         changeCurrentChat(index, contact)
                                     }}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar"/>
                        </div>
                        <div className="username">
                            <h1>{currentUserName}</h1>
                        </div>

                    </div>
                </Container>
            )}
        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        img {
            height: 3rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
        .brands {
            margin-left: 1.5rem;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .menu {
            margin-left: 1rem;

        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;

        &::-webkit-scrollbar {
            width: 0.2rem;

            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .contact {
            background-color: #ffffff34;
            min-height: 5rem;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-out;

            .avatar {
                img {
                    height: 3rem;
                    width: 3rem;
                }
            }

            .username {
                h3 {
                    color: white;
                    font-size: 22px;
                    text-transform: capitalize;
                }
            }
        }

        .selected {
            background-color: #9a86f3;
        }
    }

    .current-user {
        background-color: #0d0d30;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 2rem;

        .avatar {
            margin-left: 1.5rem;

            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }

        .username {
            h1 {
                color: white;
                font-size: 27px;
                padding-left: 2rem;
                text-transform: capitalize;
            }
        }

        a {
            color: #4e0eff;
            font-weight: bold;
            text-decoration: none;
            padding-right: 5px;
        }

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }

    }
`;
export default Contacts;
