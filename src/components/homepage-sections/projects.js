import React from 'react'
import Card from '../card';

const Projects = ()=>{
    const CambridgeGameGigHack = {
        'title': "Retro Game Design" ,
        'img': {
            'href': "https://github.com/mukul-rathi/CambridgeGameGigHack",
            'alt': "View on GitHub",
            'src': ""
        }
    };
    const OpenMined = {
        'title': "OpenMined" ,
        'img': {
            'href': "https://github.com/OpenMined/PySyft/blob/master/examples/torch/Boston_Housing_Federated_Training%20with%20Secure%20Aggregation%20and%20Diff%20Privacy.ipynb",
            'alt': "View on GitHub",
            'src': ""
        }
    };
    const OxfordHack = {
        'title': "OxfordHack - DeepDoc" ,
        'img': {
            'href': "https://github.com/OpenMined/PySyft/blob/master/examples/torch/Boston_Housing_Federated_Training%20with%20Secure%20Aggregation%20and%20Diff%20Privacy.ipynb",
            'alt': "View on GitHub",
            'src': ""
        }
    };
    return(
        <div>
            <h1>Projects</h1> 
            <Card img={CambridgeGameGigHack.img} title={CambridgeGameGigHack.title}>
                This was a horizontal shooter game designed at the Cambridge GameGig 2017 Hackathon using Lua and the Love platform.  
            </Card>
            <Card img={OpenMined.img} title={OpenMined.title}>
                <p>
                Contributed a demo notebook demonstrating the use of differential privacy, secure aggregation and federated learning using the Pysyft library. </p>
                <p>
                    This notebook's code was used by other contributors to generate more example usage.
                </p>
            </Card>
            <Card img={OxfordHack.img} title={OxfordHack.title}>
               <p>
                   Built a dashboard to help doctors classify complicated diseases which aggregated patient feedback from a Facebook Messenger chatbot as well as displaying the predicted output.
                </p>
                <p>
                    I used TensorFlow to train the neural network that used patient data to classify the type of cardiac arrhythmia.
                </p>
            </Card>
        </div>

    );


}

export default Projects;