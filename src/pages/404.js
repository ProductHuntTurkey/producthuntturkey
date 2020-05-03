import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/notfound.css"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Aradığınız Bulunamamaktadır." />
    <div className="NotFound-Container">
      <h2 className="NotFound-Title">404</h2>
      <p className="NotFound-Content">Uzay'a çıkabiliyoruz, yeni gezegenler keşfedebiliyoruz fakat teknolojimiz o kadar gelişmesine rağmen hala aradığınızı bulamıyoruz.</p>
    </div>
  </Layout>
)

export default NotFoundPage
