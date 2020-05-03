import React from "react"

import "../styles/developerinfo.css"

function DeveloperInfo() {
    return (
        <div className="Developer" 
            style={{
                borderTopLeftRadius: `.2em`,
                right: `0`,
            }}
        >
            <a className="Navigation" href="https://twitter.com/mrabdullahsahin" target="_blank" rel="noopener noreferrer">by mrabdullahsahin</a>
        </div>
    );
}

export default DeveloperInfo;