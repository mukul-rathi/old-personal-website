import React from 'react'
import GridCards from '../grid-cards';
import styles from '../../../css/section.module.css'

import GreenHackImg from '../../../assets/hackathons/greenhack.png'
import GameGigImg from '../../../assets/hackathons/gamegig.png'

const Hackathons = ()=>{
    const gridProps = {
        'GreenHack': {
            'title': "GreenHack",
            'img':{
                'src': GreenHackImg,
                'alt': "GreenHack Logo"
            },
            'date': "March 2018",
            'category': "Sustainability",
            'link1':{
                'href': "https://greenhack.hackersatcambridge.com/",
                'text' : "GreenHack Website"
            },
            'link2':{
                'href': "https://blogs.msdn.microsoft.com/uk_faculty_connection/2018/04/07/greenhack-iot-sustainability-hackathon-using-azure-services/",
                'text' : "Microsoft Blog Post"
            }, 
           
            'socialButton': {
                'href':  "https://www.facebook.com/events/694391484282782/",
                'img': "facebook"
            }, 
            'description': "Led the publicity, updated the GreenHack website with project ideas and part of judging panel on the day."
        },
        'GameGig': {
            'title': "Cambridge Game Gig 2018",
            'img':{
                'src': GameGigImg,
                'alt': "Game Gig Logo"
            },
            'date': "December 2018",
            'category': "Game Design",
            'link1':{
                'href': "https://hackersatcambridge.com/gamegig",
                'text' : "GameGig Website"
            },           
            'socialButton': {
                'href':  "https://www.facebook.com/events/https://www.facebook.com/events/1720940534684424//",
                'img': "facebook"
            }, 
            'description': "Lead Organiser of GameGig: responsibilities including liasing with sponsors, booking venue and running and judging event on day"
        },
    };

    return(
        <div className={styles.section}>
            <h2>Hackathons</h2> 
            {<GridCards {...gridProps}/>}
       </div>
    );


}

export default Hackathons;