import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Products from "../components/Products"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Products/>
  </Layout>
)

export default IndexPage
