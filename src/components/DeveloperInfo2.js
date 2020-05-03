import React from "react"

import "../styles/developerinfo.css"

function DeveloperInfo2() {
    return (
        <div className="Developer" 
            style={{
                borderTopRightRadius: `.2em`,
                left: `0`,
            }}
        >
            <a className="Navigation" href="https://twitter.com/ubeydgencer" target="_blank" rel="noopener noreferrer">by ubeydgencer</a>
        </div>
    );
}

export default DeveloperInfo2;