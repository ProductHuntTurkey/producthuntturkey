import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import logo from "../images/logo.png"
import "../styles/header.css"

const Header = () => (
  <header className="HeaderSection">
    <Link to="/">
      <div className="HeaderLogo">
        <figure>
          <img className="HeaderLogoItem" src={logo} alt="Product Hunt Turkey"/>
        </figure>
        <span className="Name">Product<br/>Hunt<br/>Turkey</span>
      </div>
    </Link>

    <nav className="MenuItems">
      <Link to="/acik-girisim/">
        <a className="MenuItem" href="/acik-girisim/">
          <button className="MenuButton">Açık Girişim</button>
        </a>
      </Link>
      <Link to="/girisimini-ekle/">
        <a className="MenuItem" href="/girisimini-ekle/">
          <button className="MenuButton">Girişimini Ekle</button>
        </a>
      </Link>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
