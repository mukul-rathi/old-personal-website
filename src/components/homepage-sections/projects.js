import GridCards from '../grid-cards';
import React from 'react'
import styles from '../../../css/section.module.css'

const Projects = ()=>{
    const gridProps = {
        'CambridgeGameGigHack' :{
            'title': "Retro Game Design" ,
            'img': {
                'href': "https://github.com/mukul-rathi/CambridgeGameGigHack",
                'alt': "View on GitHub",
                'src': ""
            },
            'description':  "This was a horizontal shooter game designed at the Cambridge GameGig 2017 Hackathon using Lua and the Love platform." 

        },
        'OpenMined' : {
            'title': "OpenMined" ,
            'img': {
                'href': "https://github.com/OpenMined/PySyft/blob/master/examples/torch/Boston_Housing_Federated_Training%20with%20Secure%20Aggregation%20and%20Diff%20Privacy.ipynb",
                'alt': "View on GitHub",
                'src': ""
            },
            'description': "Contributed a demo notebook demonstrating the use of differential privacy, secure aggregation and federated learning using the Pysyft library. This notebook's code was used by other contributors to generate more example usage."
        },
        'OxfordHack' : {
            'title': "OxfordHack - DeepDoc" ,
            'img': {
                'href': "https://github.com/OpenMined/PySyft/blob/master/examples/torch/Boston_Housing_Federated_Training%20with%20Secure%20Aggregation%20and%20Diff%20Privacy.ipynb",
                'alt': "View on GitHub",
                'src': ""
            },
            'description': " Built a dashboard to help doctors classify     complicated diseases which aggregated patient feedback from a Facebook Messenger chatbot as well as displaying the predicted output. I used TensorFlow to train the neural network that used patient data to classify the type of cardiac arrhythmia."
        }

    };
    return(
        <div className={styles.section}>
            <h2>Projects</h2> 
            {GridCards(gridProps)}
       </div>
    );


}

export default Projects;