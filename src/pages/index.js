import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Products from "../components/products"

const IndexPage = () => (
  <Layout>
    <SEO title="Ana Sayfa" />
    <Products/>
  </Layout>
)

export default IndexPage
