import React from 'react'
import SocialButton from './social-button';
import LinkButton from './link-button';
import TextContent from './text-content';
import styles from '../../css/card.module.css'


const Card  = (props) => {
    //display social/link button only if defined
    return(
        <div className={styles.card}>
            <h3> {props.title}</h3>
            {props.icon &&<SocialButton img={props.icon.img} href={props.icon.href}/>}
            {props.button &&  <LinkButton href={props.button.href}> {props.button.text} </LinkButton>}
            
            <TextContent>
                {props.description}
            </TextContent>
        </div>
    );
}

export default Card;