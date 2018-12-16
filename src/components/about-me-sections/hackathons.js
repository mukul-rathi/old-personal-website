import React from 'react'
import GridCards from '../grid-cards';
import styles from '../../../css/section.module.css'

const Hackathons = ()=>{
    const gridProps = {
        'GreenHack': {
            'title':"GreenHack",
            'img':{
                'href': "https://greenhack.hackersatcambridge.com/", 
                'src':"",
                'alt': "GreenHack Logo"
            },
            'button':{
                'href':"https://blogs.msdn.microsoft.com/uk_faculty_connection/2018/04/07/greenhack-iot-sustainability-hackathon-using-azure-services/",
                'text': "Microsoft Blog Post"
            },
            'description': "Led the publicity, updated the GreenHack website with project ideas and part of judging panel on the day."
        },

        'GameGig': {
            'title': "Cambridge Game Gig 2018",
            'button':{
                'href': "https://game-gig-one-button.netlify.com/", 
                'text': "GameGig Website"
            },
            'description':"Lead Organiser of GameGig: responsibilities including liasing with sponsors, booking venue and running and judging event on day"
        }
    };

    return(
        <div className={styles.section}>
            <h2>Hackathons</h2> 
            {GridCards(gridProps)}
       </div>
    );


}

export default Hackathons;