import React from 'react'
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    margin-right: auto;
    margin-left: auto;
    width: 65%;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: bold;
    font-size: 50px;
`;

const Content = styled.p`
    text-align: center;
    font-size: 25px;
`;

function NotFound() {
    return (
        <Container>
            <Title>404</Title>
            <Content>Uzay'a çıkabiliyoruz, yeni gezegenler keşfedebiliyoruz fakat teknolojimiz o kadar gelişmesine rağmen hala aradığınızı bulamıyoruz.</Content>
        </Container>
    )   
}

export default NotFound;
