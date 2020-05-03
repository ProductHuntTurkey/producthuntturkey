import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"

import data from "../data/data.json"

import "../styles/acik-girisim.css"

function getTotalProducts(){
    let totalProducts = 0, i;
    
    for (i in data.Startups) {
      totalProducts += data.Startups[i].ProductInfo.length;
    }
    return totalProducts;
  }

const OpenStartupPage = () => (
    <Layout>
        <SEO title="Açık Girişim"/>
        <div className="MetricContainer">
            <div className="Metric">
                <h2 className="MetricTitle">Toplam Yayınlanan Girişim</h2>
                <p className="MetricContent">{getTotalProducts()}</p>
            </div>
            <div className="Metric">
                <h2 className="MetricTitle">Toplam Mail Abonesi</h2>
                <p className="MetricContent">178</p>
            </div>
            <div className="Metric">
                <h2 className="MetricTitle">Toplam Telegram Kanalı Abonesi</h2>
                <p className="MetricContent">97</p>
            </div>
        </div>
    </Layout>
)

export default OpenStartupPage

