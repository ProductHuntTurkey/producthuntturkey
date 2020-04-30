import React from "react"
import styled from "styled-components"

const Developer = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    width: 150px;
    text-align: center;
    background-color: black;
    border-top-left-radius: .2em;
    padding: 5px;

    &:hover {
        background-color: black;
        opacity: .8;
        color: white;
        text-decoration: none;
  }
`;

const Link = styled.a.attrs({
    target: "_blank",
    href: "https://twitter.com/mrabdullahsahin"
})`
    text-decoration: none;
    color: white;
`;

function DeveloperInfo() {
    return (
        <Developer>
            <Link rel="noopener noreferrer">by mrabdullahsahin</Link>
        </Developer> 
    );
}

export default DeveloperInfo;