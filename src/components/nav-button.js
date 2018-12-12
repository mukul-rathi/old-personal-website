import React from "react"
import {Link} from "gatsby"

const NavButton = (props)=> {
    return(
        <Link to={props.to}>{props.children}</Link>
    );
}


export default NavButton