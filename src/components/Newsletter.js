import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
`;

const Details = styled.details`
    display: flex;
    align-items: center;
    justify-items: center;
    width: 65%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: bold;
    background-color: white;
    border-radius: 5px;
    color: black;

    @media (max-width: 900px) {
        width: 98%;
    }
`;

const Summary = styled.summary`
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    text-align: center;
    margin-bottom: 10px;
    cursor: pointer;
`;

const IframeDiv = styled.div`
    display: flex;
    justify-content: center;
`

const Iframe = styled.iframe`
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #EEE; 
    background:#F5F5F5;
    width: 480px;
    height: 320px;

    @media (max-width: 900px) {
        width: 90%;
        height: 320px;
    }
`;

function Newsletter(){
    return(
        <Container>
            <Details>
                <Summary>Product Hunt Turkey mail listesine katıl!</Summary>
                <IframeDiv>
                    <Iframe src="https://producthuntturkey.substack.com/embed" frameborder="0" scrolling="no"></Iframe>
                </IframeDiv>
            </Details>
        </Container>
    );
}
  
export default Newsletter;
