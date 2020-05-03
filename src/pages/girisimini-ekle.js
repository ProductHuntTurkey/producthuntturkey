import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/girisimini-ekle.css"

const AddYourProduct = () => (
  <Layout>
    <SEO title="Girişimini Ekle" />
    <div className="IframeDiv">
        <iframe className="Iframe" title="form" src="https://docs.google.com/forms/d/e/1FAIpQLSeytVuWJH6XeEKpVc5w9RFOmyqBen6tZD1CyKE4nMk5-PpqXA/viewform?embedded=true" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">...Yükleniyor</iframe>
    </div>
  </Layout>
)

export default AddYourProduct