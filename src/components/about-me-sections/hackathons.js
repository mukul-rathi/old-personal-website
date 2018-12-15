import GridCards from '../grid-cards';

const Hackathons = ()=>{
    const gridProps = {
        'sectionHeading' : "Hackathons",
        'cards' : {
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
                'img':{
                    'href': "https://game-gig-one-button.netlify.com/", 
                    'src':"",
                    'alt': "GameGig Logo"
                },
                'description':"Lead Organiser of GameGig: responsibilities including liasing with sponsors, booking venue and running and judging event on day"
            }
        }
    };

    return(
        GridCards(gridProps)
    );


}

export default Hackathons;