import React from "react"
import NavBar from "./nav-bar";
import Footer from './footer'
import styles from '../../css/layout.module.scss'
const Layout = (props)=>(
    <div className={styles.layout}> 
        <NavBar page = {props.page}/>
        {props.children}
        <Footer/>
    </div>
);

export default Layout;