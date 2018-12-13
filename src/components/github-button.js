import React from 'react';
import SocialButton from './social-button';

const GitHubButton = (props) => {
    return(
        <SocialButton href={props.srcCode} alt="View on GitHub"/>
    );
}

export default GitHubButton;