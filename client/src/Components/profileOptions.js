import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Logout from "./Logout";
import {LuMenu} from "react-icons/lu";
import styled from "styled-components";

const ProfileOptions = () => {
    const [displayOptions, setDisplayOptions] = useState(false);
    return (
        <Container>
            <div className="menu" onClick={() => setDisplayOptions(!displayOptions)}>
                <LuMenu style={{color: 'white', fontSize: '30px'}}/>
            </div>

            {displayOptions &&

                <div className="options">
                    <Link to="/avatar"><p>Change Avatar</p> </Link>
                    <Link to="/setusername"><p>Change username</p></Link>
                    <Logout/>
                </div>
            }

        </Container>

    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    .menu {
        cursor: pointer;
    }

    .options {
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
        border-radius: 0.5rem;
        background-color: #7f6ccb;
        position: absolute;
        top: 8rem;
        left: 8rem;
        width: 22rem;

        a {
            padding-top: 8px;
            color: #21056c;
            font-weight: bold;
            text-decoration: none;

            p:hover {
                color: #d1d0d5;
            }
        }

    }


`

export default ProfileOptions;