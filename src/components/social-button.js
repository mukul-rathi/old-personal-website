import React from 'react'
import classNames from 'classNames'
import styles from '../../css/social-button.module.css'
const SocialButton = (props) =>{
    return(
        <a href={props.href} className ={classNames(styles.socialButton, props.className)}>
        </a>
    );
}

export default SocialButton;