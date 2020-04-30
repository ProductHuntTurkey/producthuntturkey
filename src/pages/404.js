import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

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

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container>
      <Title>404</Title>
      <Content>Uzay'a çıkabiliyoruz, yeni gezegenler keşfedebiliyoruz fakat teknolojimiz o kadar gelişmesine rağmen hala aradığınızı bulamıyoruz.</Content>
    </Container>
  </Layout>
)

export default NotFoundPage
