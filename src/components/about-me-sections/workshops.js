import React from 'react'
import GridCards from '../grid-cards';
import styles from '../../../css/section.module.css'

const Workshops = ()=>{
    const gridProps = {
        'IntroDeepLearn1': {
            'title':"Intro to Neural Networks",
            'icon':{
                'href':"https://www.youtube.com/watch?v=84iCkb7hqKs", 
                'img': "youtube"
            },
            'button':{
                'href':"https://hackersatcambridge.com/workshops/deep-learning",
                'text': "Workshop Material"
            },
            'description': "An Introduction to Neural Networks and how they learn."
        },
        'IntroDeepLearn2': {
            'title':"Convolutional Neural Networks ",
            'icon':{
                'href': "https://www.youtube.com/watch?v=bqPfxwrCBUk", 
                'img': 'youtube'
            },
            'button':{
                'href':"https://hackersatcambridge.com/workshops/deep-learning",
                'text': "Workshop Material"
            },
            'description': "Deep learning for Computer Vision"
        },
        'IntroDeepLearn3': {
            'title':"Recurrent Neural Networks",
            'icon':{
                'href': "", 
                'img': 'youtube'
            },
            'button':{
                'href':"https://hackersatcambridge.com/workshops/deep-learning",
                'text': "Workshop Material"
            },
            'description': "Applying Deep Learning to Natural Language Processing "
        }
    }
    return(
        <div className={styles.section}>
            <h2>Workshops</h2> 
            {GridCards(gridProps)}
        </div>
    
    );

}

export default Workshops;