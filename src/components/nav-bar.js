import React from "react"
import { Link } from "gatsby";
import styles from '../../css/nav-bar.module.css'
import classNames from 'classnames'
const NavBar = (props)=>{
    const navButtons = {
        "Home" : "/",
        "About Me" : "/about-me",
        "Blog" : "/blog"
    };
   
    return (
        <nav className={styles.navBar}> 
            {
            Object.entries(navButtons).map(
            ([key, value]) =>  (<Link 
                className= {classNames(styles.navButton, (props.page===key)? styles.selectedNavButton : null)}
                 to={value} key={key}> {key}</Link>)
            )
            }
        </nav>
    );

}

export default NavBar;