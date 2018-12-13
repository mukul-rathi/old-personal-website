import React from 'react'
import Card from '../card';

const Hackathons = ()=>{
    const GreenHack=   {
        'title':"GreenHack",
        'img':{
            'href': "https://greenhack.hackersatcambridge.com/", 
            'src':"",
            'alt': "GreenHack Logo"
        },
        'button':{
            'href':"https://blogs.msdn.microsoft.com/uk_faculty_connection/2018/04/07/greenhack-iot-sustainability-hackathon-using-azure-services/",
            'text': "Microsoft Blog Post"
        }
    };

    const GameGig = {
        'title': "Cambridge Game Gig 2018",
        'img':{
            'href': "https://game-gig-one-button.netlify.com/", 
            'src':"",
            'alt': "GameGig Logo"
        },
    }

    return(
        <div>
            <h2>Hackathons</h2>
            <Card title={GreenHack.title} img={GreenHack.img} button={GreenHack.button}> Led the publicity, updated the GreenHack website with project ideas and part of judging panel on the day. </Card>
            <Card title={GameGig.title} img={GameGig.img} button={GameGig.button}> Lead Organiser of GameGig: responsibilities including liasing with sponsors, booking venue and running and judging event on day</Card>
        </div>
    );


}

export default Hackathons;