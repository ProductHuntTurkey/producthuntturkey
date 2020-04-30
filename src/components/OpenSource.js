import React from 'react'
import styled from 'styled-components'

const Container = styled.section`
    display: flex;
    justify-content: center;
    text-align: center;
    background-color: black;
    opacity: 0.9;
`;

const Content = styled.h1`
    position: static;
    color: white;
    font-size: 15px;
    margin: 10px;

    @media (max-width: 900px) {
        font-size: 10px;
    }
`;

const Link = styled.a.attrs({
    target: "_blank",
    href: "https://github.com/ProductHuntTurkey/producthuntturkey.github.io"
})`
    text-decoration: none;
    opacity: 1;
    color: yellow;

    &:hover{
        color: black;
        background-color: yellow;
        transition: 0.5s all;
    }
`;

function OpenSource(){
    return(
        <Container>
            <Content>Product Hunt Turkey açık kaynaklı bir girişimdir.<Link><span> </span>Katkıda bulunun!</Link></Content>
        </Container>
    );
}

export default OpenSource;
