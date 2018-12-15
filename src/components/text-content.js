import React from 'react'
import styles from '../../css/text-content.module.css'
const TextContent = (props) => {
    return(
        <div className={styles.textContent} >
            {props.children}
        
        </div>

    );
}
export default TextContent;