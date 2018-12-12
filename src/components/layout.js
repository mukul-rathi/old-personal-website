import React from "react"
import NavBar from "./nav-bar";
import Footer from './footer'

const Layout = (props)=>{
    return(
        <div> 
            <NavBar/>
            {props.children}
            <Footer/>
        </div>
    );


}
export default Layout;