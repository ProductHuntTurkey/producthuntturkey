import React from 'react'
import styled from "styled-components"

import data from "../data/data.json"

import Layout from "../components/layout"
import SEO from "../components/seo"

function getProductsLength(){
    let totalProducts = 0, i;
    
    for (i in data.Startups) {
      totalProducts += data.Startups[i].ProductInfo.length;
    }
    return totalProducts;
  }

const Container = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    width: 65%;
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
`;

const Metric = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    background: white;
    border-radius: 5px;
    width: 250px;
    height: 150px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-top: 30px;

    &:not(:last-child){
        margin-right: 30px;
    }
`;

const MetricTitle = styled.h2`
    display: flex;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 41px;
`;

const MetricContent = styled.p`
    display: flex;
    font-style: normal;
    font-weight: 800;
    font-size: 48px;
    line-height: 65px;
`;

const OpenStartupPage = () => (
    <Layout>
        <SEO title="Açık Girişim" />
        <Container>
            <Metric>
                <MetricTitle>Toplam Yayınlanan Girişim</MetricTitle>
                <MetricContent>{getProductsLength()}</MetricContent>
            </Metric>

            <Metric>
                <MetricTitle>Toplam Mail Abonesi</MetricTitle>
                <MetricContent>178</MetricContent>
            </Metric>

            <Metric>
                <MetricTitle>Toplam Telegram Kanalı Abonesi</MetricTitle>
                <MetricContent>99</MetricContent>
            </Metric>
        </Container>
    </Layout>
)

export default OpenStartupPage;

