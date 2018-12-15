import React from 'react'
import SocialButton from './social-button';
import styles from '../../css/footer.module.css'
const Footer = ()=>{
    return(
        <footer>
            <div>
            <SocialButton href="feed.xml" alt="RSS"/> <SocialButton href="https://www.linkedin.com/in/mukul-rathi-17230014a/" alt="LinkedIn"/>
            <SocialButton href="http://github.com/mukul-rathi" alt="GitHub"/>
            </div>
        </footer>

    );

}

export default Footer;