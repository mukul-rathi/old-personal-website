import React from 'react'
import SocialButton from './social-button';
import styles from '../../css/footer.module.css'
const Footer = ()=>{
    return(
        <footer>
            <div className={styles.socialButton}>
            <SocialButton img='rss' href="/rss.xml"/> <SocialButton href="https://www.linkedin.com/in/mukul-rathi-17230014a/" img="linkedIn"/>
            <SocialButton img='github' href="http://github.com/mukul-rathi" />
            </div>      
        <span className={styles.copyrightText}>© Mukul Rathi 2018 </span> 
        </footer>

    );

}

export default Footer;