import React from 'react'
import SocialButton from './social-button';
//eslint-disable-next-line
import styles from '../../css/footer.module.css'
const Footer = ()=>{
    return(
        <footer>
            <div>
            <SocialButton img='rss' href="feed.xml"/> <SocialButton href="https://www.linkedin.com/in/mukul-rathi-17230014a/" img="linkedIn"/>
            <SocialButton img='github' href="http://github.com/mukul-rathi" />
            </div>
        </footer>

    );

}

export default Footer;