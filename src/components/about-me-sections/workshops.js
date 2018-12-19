import React from 'react'
import GridCards from '../grid-cards';
import styles from '../../../css/section.module.css'

import DeepLearn1 from '../../../assets/workshops/deep-learn-1.png'
import DeepLearn2 from '../../../assets/workshops/deep-learn-2.png'

const Workshops = ()=>{
    const gridProps = {
        'IntroDeepLearn1':{
            'title':"Intro to Neural Networks",
            'img': {
                'src': DeepLearn1,
                'alt': "Workshop Banner"
            },
            'date': "November 2018",
            'category': "Deep Learning",
            'link1':{
                'href': "https://hackersatcambridge.com/workshops/deep-learning",
                'text' : "View Workshop Material"
            }, 
            'link2':{
                'href': "https://github.com/hackersatcambridge/workshop-deep-learning",
                'text' : "GitHub Repo"
            },
            'socialButton': {
                'href':"https://www.youtube.com/watch?v=84iCkb7hqKs", 
                'img': "youtube"
            }, 
            'description': "An Introduction to Neural Networks and how they learn."
        },
        'IntroDeepLearn2':{
            'title':"Convolutional Neural Networks",
            'img': {
                'src': DeepLearn2,
                'alt': "Workshop Banner"
            },
            'date': "November 2018",
            'category': "Deep Learning",
            'link1':{
                'href': "https://hackersatcambridge.com/workshops/deep-learning",
                'text' : "View Workshop Material"
            }, 
            'link2':{
                'href': "https://github.com/hackersatcambridge/workshop-deep-learning",
                'text' : "GitHub Repo"
            },
            'socialButton': {
                'href':"https://www.youtube.com/watch?v=bqPfxwrCBUk", 
                'img': "youtube"
            }, 
            'description': "Deep learning for Computer Vision"
        },
    }
    return(
        <div className={styles.section}>
            <h2>Workshops</h2> 
            {<GridCards {...gridProps}/>}
        </div>
    
    );

}

export default Workshops;