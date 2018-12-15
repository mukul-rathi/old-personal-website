import React from 'react'
import Card from './card';
import styles from '../../css/grid-cards.module.css'

const GridCards = (props)=>{
    return(
        <div className={props.className}>
            <h2 className={styles.sectionHeading}>{props.sectionHeading}</h2> 
            <div className={styles.cards}>
               { Object.values(props.cards).map(cardProps => Card(cardProps))
               }
            </div>
        </div>

    );


}

export default GridCards;