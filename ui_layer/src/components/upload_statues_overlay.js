import React from 'react';
import '../styles/overlay_styles.css'
export default function PresentOverlay(props) {
    return (<React.Fragment>
        <div className='overlay_strip_styles' >
            <span className="overlay_text_styles">{props.userText}</span>
        </div>
    </React.Fragment>)
}