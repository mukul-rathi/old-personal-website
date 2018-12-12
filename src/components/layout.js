import React from "react"
import NavBar from "./nav-bar";

const Layout = (props)=>{
    return(
        <div> 
            <NavBar></NavBar>
            {props.children}
        </div>
    );


}
export default Layout;