/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import DeveloperInfo from "./DeveloperInfo"
import DeveloperInfo2 from "./DeveloperInfo2"
import Newsletter from "./Newsletter"
import OpenSource from "./OpenSource"

import "../styles/layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <OpenSource/>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Newsletter/>
      <div>
        <main>{children}</main>
        <DeveloperInfo/>
        <DeveloperInfo2/>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
