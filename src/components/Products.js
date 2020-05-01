import React, { Component } from 'react';
import styled from "styled-components"

import data from "../data/data.json"

import Pictures from "../components/Pictures"

const ProductSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const Time = styled.time`
    display: flex;
    margin: auto;
    font-weight: bold;
    font-size: 1.2em;
    margin-left: 17.5%;
    margin-top: 25px;
    margin-bottom: 10px;

    @media (max-width: 900px) {
        margin-left: 1%;
        margin-top: 5%;
        margin-bottom: 3%;
    }
`;

const StartupList = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 65%;
    background: #FFFFFF;
    margin: auto;
    margin-bottom: 15px;

    @media (max-width: 900px) {
        width: 98%;
    }
`;

const ListData = styled.article`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    justify-content: space-around;
    width: 100%; 
    padding-bottom: 15px;
    border-radius: 5px;

    &:hover{
        background-color: black;
        color: white;
    }
`;

const Picture = styled.img`
    display: flex;
    height: 100px;
    width: 100px;
    padding: 15px;

    @media (max-width: 900px) {
        height: 80px;
        width: 80px;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 1;
`;

const InfoTitle = styled.h1`
    display: flex;
    font-style: normal;
    font-weight: bold;
    font-size: 1.2em;
    line-height: 40px;
    left: 0;
    top: 0;

    @media (max-width: 900px) {
        font-size: 15px;
        line-height: 25px;
    }
`;

const InfoDescription = styled.p`
    display: flex;
    font-style: normal;
    font-weight: normal;
    font-size: 1.2em;

    @media (max-width: 900px) {
        font-size: 15px;
    }
`;

const Link = styled.a.attrs({
    target: "_blank",
    rel: "noopener noreferrer"
})`
    display: flex;
    text-decoration: none;
    cursor: default;
`;

const Button = styled.button`
    width: 100px;
    height: 50px;
    border-radius: 10px;
    color: black;
    font-weight: normal;
    padding: 8px 15px;
    font-size: 1.2em;
    border: 1px solid black;
    margin: auto;
    cursor: pointer;
    margin-right: 25px;

    &:hover {
        color:white;
        border: 0px;
        background-color: black;
        border: 1px solid white;
        transition: 0.3s;
    }

    @media (max-width: 900px) {
        width: 75px;
        height: 40px;
        border-radius: 5px;
        color: black;
        font-weight: normal;
        padding: 5px;
        font-size: 15px;
        border: 1px solid black;
        margin: auto;
        cursor: pointer;
        margin-right: 5px;
        background-color: white;
    }
`;

class Products extends Component {
  
    render () {
      return (
        <ProductSection>
        {
            data.Startups.map(startup => {
                return (
                    <div>
                        <Time>{startup.productDate}</Time>
                        <StartupList>
                            {
                            startup.ProductInfo.map(info => {
                              return (
                                  <ListData>
                                    <figure>
                                        <Picture src={Pictures[info.productPicture]}/>
                                    </figure>
                                    <Info>
                                        <InfoTitle>{info.productName}</InfoTitle>
                                        <InfoDescription>{info.productDescription}</InfoDescription>
                                    </Info>
                                    <Link href={info.productLink}>
                                        <Button>Destekle</Button>
                                    </Link>
                                  </ListData>
                              );
                            })
                          }
                        </StartupList>
                    </div>
                );
            })
        }
        </ProductSection>
      );
    }
}

export default Products;
