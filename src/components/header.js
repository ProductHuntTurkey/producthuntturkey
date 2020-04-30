import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import logo from "../images/logo.png"

const HeaderSection = styled.header`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    background-color: white;
    border: 1px solid #E5E5E5;
    width: 100%;
    height: 100px;

    @media (max-width: 900px) {
        justify-content: space-between;
    }
`;

const Logo = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
`;

const Picture = styled.img`
    display: flex;
    flex-shrink: 1;
    width: 75px;
    height: 75px;

    @media (max-width: 900px) {
        width: 50px;
        height: 50px;
    }
`;

const Title = styled.div`
    display: flex;
    color: black;
    text-align: left;
    justify-content: center;
    font-weight: bold;
    padding-left: 20px;
`;

const Nav = styled.nav`
    display: flex;
`;

const Menu = styled.a`
    display: flex;
    text-decoration: none;
    border: 2px solid black;
    border-radius: 5px;
    color: black;
    font-weight: bold;
    padding: 8px 15px;
    font-size: 20px;
    box-shadow: none;

    &:hover {
        background-color: black;
        color: white;
        transition: 0.5s all;       
    }

    &:first-child {
        margin-right: 10px;
    }

    @media (max-width: 900px) {
        font-size: 10px;
        border-radius: 5px;
    }
`;

const Header = ({ siteTitle }) => (
  <header>
      <HeaderSection>
        <Link to="/">
            <Logo>
                <figure>
                    <Picture src={logo} alt="Product Hunt Turkey"></Picture>
                </figure>
                <Title>Product<br/>Hunt<br/>Turkey</Title>
            </Logo>
        </Link>

        <Nav>
            <Link to="/acik-girisim/">
                <Menu>Açık Girişim</Menu>
            </Link>

            <Link to="/girisimini-ekle/">
                <Menu>Girişimini Ekle</Menu>
            </Link>
        </Nav>
    </HeaderSection>  
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
