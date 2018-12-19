import GridCards from '../grid-cards';
import React from 'react'
import styles from '../../../css/section.module.css'

import OpenMinedImg from '../../../assets/projects/openmined.png'
import OxfordHackImg from '../../../assets/projects/oxfordhack.jpg'
import CambridgeGameGigHackImg from '../../../assets/projects/CambridgeGameGigHack.png'

const Projects = ()=>{
    const gridProps = {

        'CambridgeGameGigHack' : {
            'title': "Retro Game Design",
            'img': {
                'src': CambridgeGameGigHackImg,
                'alt': "Screenshot of Game"
            },
            'date': "December 2017",
            'category': "Hackathon",
            'socialButton': {
                'href': "https://github.com/mukul-rathi/CambridgeGameGigHack",
                'img': "github"
            }, 
            'description': "A horizontal shooter game designed at the Cambridge GameGig 2017 Hackathon using Lua and the Love platform."
        },
        'OpenMined' : {
            'title': "OpenMined",
            'img': {
                'src': OpenMinedImg,
                'alt': "OpenMined Logo"
            },
            'date': "November 2018",
            'category': "Open Source",
            'socialButton': {
                'href': "https://github.com/OpenMined/PySyft/blob/master/examples/torch/Boston_Housing_Federated_Training%20with%20Secure%20Aggregation%20and%20Diff%20Privacy.ipynb",
                'img': "github"
            }, 
            'description': "Contributed a demo notebook demonstrating the use of differential privacy, secure aggregation and federated learning using the Pysyft library. This notebook's code was used by other contributors to generate more example usage."
        },
        'OxfordHack': {
            'title': "OxfordHack",
            'img': {
                'src': OxfordHackImg,
                'alt': "Oxford Hack Logo"
            },
            'date': "November 2017",
            'category': "Hackathon",
            'link1':{
                'href': "https://github.com/mukul-rathi/DeepDoc",
                'text' : "View on GitHub"
            }, 
            'socialButton': {
                'href': "https://www.youtube.com/watch?v=Ccl5iRXDHxY",
                'img': "youtube"
            }, 
            'description': "Built a dashboard to help doctors classify complicated diseases which aggregated patient feedback from a Facebook Messenger chatbot as well as displaying the predicted output. I used TensorFlow to train the neural network that used patient data to classify the type of cardiac arrhythmia."
        }

    };
    return(
        <div className={styles.section}>
            <h2>Projects</h2> 
            {<GridCards {...gridProps}/>}
       </div>
    );


}

export default Projects;