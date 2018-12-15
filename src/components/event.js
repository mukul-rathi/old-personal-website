import React from 'react'
import TextContent from './text-content';
import styles from '../../css/event.module.css'
const Event = (props) =>{
    return(
        <div className={styles.event}>
            <div className={styles.metaData}>
                <h4 className={styles.date}>{props.date}</h4>
                <img src={props.logo} alt="event-logo"></img>
            </div>
            <div className={styles.mainContent}>
                <h3> {props.location} </h3>
                <h3> {props.role}</h3>
                <TextContent>
                   {props.children}
                </TextContent>
            </div>
        </div>
    );
}
export default Event;