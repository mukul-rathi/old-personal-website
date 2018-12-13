import React from 'react'
import SocialButton from './social-button';

const Footer = ()=>{
    return(
        <footer>
            <SocialButton href="feed.xml" alt="RSS"/> <SocialButton href="https://www.linkedin.com/in/mukul-rathi-17230014a/" alt="LinkedIn"/>
            <SocialButton href="http://github.com/mukul-rathi" alt="GitHub"/>
        </footer>

    );

}

export default Footer;