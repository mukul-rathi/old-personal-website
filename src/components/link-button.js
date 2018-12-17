import React from 'react'
import {Link} from "gatsby"
import styles from '../../css/link-button.module.css'

const LinkButton = (props) =>{
    if(props.href && !props.href.includes("http")){ //internal link to website so client-side routing
        return <Link to={props.href} className={styles.linkButton} >{props.children} </Link>
    }
    else { 
        return <a href={props.href} className={styles.linkButton}>{props.children} </a>

    }
}   
export default LinkButton;