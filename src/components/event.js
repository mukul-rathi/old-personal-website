import React from 'react'
import TextContent from './text-content';

const Event = (props) =>{
    return(
        <div>
            <div>{props.date}
                <img src={props.logo} alt="event-logo"></img>
            </div>
            <div>
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