import React from "react"
import NavButton from "./nav-button"
const NavBar = ()=>{
    return (
        <nav> 
            <NavButton to="/"> Home </NavButton>
            <NavButton to="/about-me"> About Me </NavButton>
            <NavButton to= "/blog/"> Blog </NavButton>
        </nav>
    );

}

export default NavBar;