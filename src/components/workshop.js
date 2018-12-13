import React from 'react'
import SocialButton from './social-button';
import LinkButton from './link-button';
import TextContent from './text-content';

const Workshop  = (props) =>{
    return(
        <div>
            <h3> {props.title}</h3>
            <SocialButton href={props.video} alt="YouTube link"/>
            <LinkButton href={props.material}> Workshop Materials </LinkButton>
            <TextContent>
                {props.children}
            </TextContent>
        </div>
    );
}

export default Workshop;
