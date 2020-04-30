import React from "react"
import styled from "styled-components"

const Developer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 120px;
    text-align: center;
    background-color: black;
    border-top-right-radius: .2em;
    padding: 5px;

    &:hover {
        background-color: black;
        opacity: .8;
        color: white;
    }
`;

const Link = styled.a.attrs({
    target: "_blank",
    href: "https://twitter.com/ubeydgencer"
})`
    text-decoration: none;
    font-size: 15px;
    color: white;
`;

function DeveloperInfo2(){
    return (
        <Developer>
            <Link>by ubeydgencer</Link>
        </Developer>
    );
}

export default DeveloperInfo2;