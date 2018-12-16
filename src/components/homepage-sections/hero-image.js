import React from 'react'
import SocialButton from '../social-button'
import styles from '../../../css/transition-image.module.css'

const HeroImage = () =>{
    return(
        <div className={styles.heroImage}>
            <div className={styles.heroContent}>
            <h1 className={styles.heroText}> Mukul Rathi</h1>
            <SocialButton href="https://www.linkedin.com/in/mukul-rathi-17230014a/" img="linkedIn"/>
            <SocialButton href="http://github.com/mukul-rathi" img="github"/>
            </div>
        </div>
    );
}

export default HeroImage;