import React from 'react'

import "../styles/newsletter.css"

function Newsletter(){
    return(
        <div className="Container">
            <details className="Details">
                <summary className="Summary">Product Hunt Turkey mail listesine katıl!</summary>
                <div className="MailDiv">
                    <iframe className="MailIframe" title="Product Hunt Turkey Mail Listesi" src="https://producthuntturkey.substack.com/embed" frameborder="0" scrolling="no"></iframe>
                </div>
            </details>
        </div>
    );
}
  
export default Newsletter;
