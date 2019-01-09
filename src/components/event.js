import React from 'react'
import styles from '../../css/event.module.scss'
const Event = (props) =>{
    return(
        <div className={styles.event}>
            <div className={styles.metaData}>
                <h4 className={styles.date}>{props.date}</h4>
                <img src={props.logo} alt="event-logo"></img>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.headings}>
                <h3 className={styles.location}> {props.location} </h3>
                <h3 className={styles.role}> {props.role}</h3>
                </div>
                <div className={styles.description}>
                   {props.children}
                </div>
            </div>
        </div>
    );
}
export default Event;