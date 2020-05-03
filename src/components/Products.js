import React from 'react'

import data from "../data/data.json"
import "../styles/products.css"
import Pictures from "./pictures"

const Products = () => (
    <div className="ProductSection">
    {
        data.Startups.map(startup => {
            return(
                <div>
                    <time className="Time">{startup.productDate}</time>
                    <section className="StartupList">
                        {
                            startup.ProductInfo.map(info => {
                                return (
                                    <article className="ListData">
                                        <figure>
                                            <img className="Picture" src={Pictures[info.productPicture]} alt={Pictures[info.productPicture]}/>
                                        </figure>

                                        <div className="Info">
                                            <h2 className="InfoTitle">{info.productName}</h2>
                                            <p className="InfoDescription">{info.productDescription}</p>
                                        </div>

                                        <a className="Support" href={info.productLink} target="_blank" rel="noopener noreferrer">
                                            <button className="SupportButton">Destekle</button>
                                        </a>
                                    </article>
                                );
                            })
                        }
                    </section>
                </div>
            );
        })
    }
    </div>
)

export default Products
