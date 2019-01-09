import React from 'react'
import styles from '../../css/transition-image.module.scss'
import classNames from 'classnames'
const TransitionImage = (props) =>{
    return(
    <div className={classNames(styles.transitionImage, props.className)}>
        <h2>{props.text}</h2>
    </div>
    );
}

export default TransitionImage;