import React from 'react'
import GridCards from '../grid-cards';
import styles from '../../../css/section.module.css'

const Workshops = ()=>{
    const gridProps = {
        'sectionHeading': 'Workshops',
        'cards' : {
             'IntroDeepLearn1': {
                'title':"Intro to Neural Networks",
                'img':{
                    'href':"https://www.youtube.com/watch?v=84iCkb7hqKs", 
                    'src':"",
                    'alt': "YouTube Link to Workshop Recording"
                },
                'button':{
                    'href':"https://hackersatcambridge.com/workshops/deep-learning",
                    'text': "Workshop Material"
                },
                'description': "An Introduction to Neural Networks and how they learn."
            },
            'IntroDeepLearn2': {
                'title':"Convolutional Neural Networks ",
                'img':{
                    'href': "https://www.youtube.com/watch?v=bqPfxwrCBUk", 
                    'src':"",
                    'alt': "YouTube Link to Workshop Recording"
                },
                'button':{
                    'href':"https://hackersatcambridge.com/workshops/deep-learning",
                    'text': "Workshop Material"
                },
                'description': "Deep learning for Computer Vision"
            },
            'IntroDeepLearn3': {
                'title':"Recurrent Neural Networks",
                'img':{
                    'href': "", 
                    'src':"",
                    'alt': "YouTube Link to Workshop Recording"
                },
                'button':{
                    'href':"https://hackersatcambridge.com/workshops/deep-learning",
                    'text': "Workshop Material"
                },
                'description': "Applying Deep Learning to Natural Language Processing "
            }
        }
    }
    return(
        <div className={styles.section}>
        {GridCards(gridProps)}
        </div>
    
    );

}

export default Workshops;