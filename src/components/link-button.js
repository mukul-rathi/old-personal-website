import React from 'react'
import {Link} from "gatsby"

const LinkButton = (props) =>{
    if(props.src && !props.src.includes("http")){ //internal link to website so client-side routing
        return <Link to={props.href}>{props.children}</Link>
    }
    else { 
        return <a href={props.href}>{props.children}</a>

    }
}   
export default LinkButton;