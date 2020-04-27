import React from 'react';
import styled from 'styled-components'

const IframeDiv = styled.div`
    display: flex;
    justify-content: center;
`

const Iframe = styled.iframe`
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #EEE; 
    background:#F5F5F5;
    width: 65%;
    height: 500px;

    @media (max-width: 900px) {
        width: 90%;
        height: 500px;
    }
`;

function AddYourStartup(){
    return (
        <IframeDiv>
            <Iframe title="form" src="https://docs.google.com/forms/d/e/1FAIpQLSeytVuWJH6XeEKpVc5w9RFOmyqBen6tZD1CyKE4nMk5-PpqXA/viewform?embedded=true" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Yükleniyor…</Iframe>
        </IframeDiv>
    )
}

export default AddYourStartup;