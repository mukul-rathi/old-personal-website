import React from 'react'

const SocialButton = (props) =>{

    return(
        <a href={props.href}>
        <img src={props.img} alt={props.alt}/>
        </a>
    );
}

export default SocialButton;