import React from 'react'
import Event from '../event';
import styles from '../../../css/section.module.css'

const WorkExperience = ()=>{
    const JazzNetworks = {
        'date' : "July - September 2018",
        'location': "Jazz Networks",
        'role': "Software Engineer Intern"
    };
    const CompVision = {
        'date' : "July - August 2016",
        'location': "Computer Vision Laboratory, University of Nottingham",
        'role': "Deep Learning Research Intern"
    };
    return(
        <div className={styles.section}>
            <h2>Experience</h2>
            <Event date={JazzNetworks.date} location={JazzNetworks.location} role={JazzNetworks.role}>
            Worked in the Machine Learning team using a beta-VAE for unsupervised clustering techniques.
            </Event>
            <Event date={CompVision.date} location={CompVision.location} role={CompVision.role}>
            Used Fully Convolutional Networks for semantic segmentation.
            </Event>
        </div>

    );


}

export default WorkExperience;