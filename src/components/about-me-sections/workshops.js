import React from 'react'
import Card from '../card';

const Workshops = ()=>{
    const IntroDeepLearn1 =  {
        'title':"Intro to Neural Networks",
        'img':{
            'href':"https://www.youtube.com/watch?v=84iCkb7hqKs", 
            'src':"",
            'alt': "YouTube Link to Workshop Recording"
        },
        'button':{
            'href':"https://hackersatcambridge.com/workshops/deep-learning",
            'text': "Workshop Material"
        }
    };
    const IntroDeepLearn2 =  {
        'title':"Convolutional Neural Networks ",
        'img':{
            'href': "https://www.youtube.com/watch?v=bqPfxwrCBUk", 
            'src':"",
            'alt': "YouTube Link to Workshop Recording"
        },
        'button':{
            'href':"https://hackersatcambridge.com/workshops/deep-learning",
            'text': "Workshop Material"
        }
    };
        const IntroDeepLearn3 =  {
            'title':"Recurrent Neural Networks",
            'img':{
                'href': "", 
                'src':"",
                'alt': "YouTube Link to Workshop Recording"
            },
            'button':{
                'href':"https://hackersatcambridge.com/workshops/deep-learning",
                'text': "Workshop Material"
            }
    };
    return(
        <div>
            <h2>Workshops</h2>
            <Card title={IntroDeepLearn1.title} img = {IntroDeepLearn1.img} button={IntroDeepLearn1.button} > An Introduction to Neural Networks and how they learn. </Card>
            <Card title={IntroDeepLearn2.title} img = {IntroDeepLearn2.img} button={IntroDeepLearn2.button} > Deep learning for Computer Vision</Card>
            <Card title={IntroDeepLearn3.title} img = {IntroDeepLearn3.img} button={IntroDeepLearn3.button} > Applying Deep Learning to Natural Language Processing </Card>
        </div>

    );


}

export default Workshops;