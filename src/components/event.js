import React from 'react'
import styles from '../../css/event.module.scss'

import Img from 'gatsby-image'

const Event = (props) =>(
    <section className={styles.event}>
        <div className={styles.metaData}>
            <h4 className={styles.date}>{props.date}</h4>
            <Img className={styles.img} fluid={props.logo} alt="event-logo"/>
        </div>
        <div className={styles.mainContent}>
            <div className={styles.headings}>
                <h3 className={styles.location}> {props.location} </h3>
                <h3 className={styles.role}> {props.role}</h3>
            </div>
            <div className={styles.description}>
                {Object.keys(props.points).map(title =>
                    (
                    <p>
                        {title && <strong>{title}:  </strong>}
                        {props.points[title]}
                    </p>  
                    ))}
            </div>
        </div>
    </section> 
);
export default Event;