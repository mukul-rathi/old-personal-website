import React from 'react'
import Workshop from '../workshop';

const Workshops = ()=>{
    return(
        <div>
            <h2>Workshops</h2>
            <Workshop title="Intro to Neural Networks" video="https://www.youtube.com/watch?v=84iCkb7hqKs" material="https://hackersatcambridge.com/workshops/deep-learning"> An Introduction to Neural Networks and how they learn. </Workshop>
            <Workshop title="Computer Vision" video="https://www.youtube.com/watch?v=bqPfxwrCBUk" material="https://hackersatcambridge.com/workshops/deep-learning"> The theory behind Convolutional Neural Networks </Workshop>
            <Workshop title="Natural Language Processing" video="" material="https://hackersatcambridge.com/workshops/deep-learning"> Recurrent Neural Networks </Workshop>
        </div>

    );


}

export default Workshops;