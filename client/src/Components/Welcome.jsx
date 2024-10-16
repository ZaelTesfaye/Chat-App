import React from "react";
import styled from "styled-components"

function Welcome ({currentUser}) {
    return(
        <Container>
            <h1>Welcome <span>{!(currentUser===undefined) && currentUser.username}</span></h1>
            <h3>Please select chat to start messaging</h3>
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
        height: 20rem;
    }
    span {
        color: #4e0eff;
    }
    h1{
        font-size: 2rem;
    }
    h3{
        font-size: 1.5rem;
    }
`
export default Welcome;

