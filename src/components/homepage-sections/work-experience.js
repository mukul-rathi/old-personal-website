import React from 'react'
import Event from '../event';
import styles from '../../../css/section.module.scss'
import NottCompVision from '../../../assets/logos/computer-vision-lab.png'
import JazzLogo from '../../../assets/logos/jazz-networks.jpg'



const WorkExperience = ()=>{
    const JazzNetworks = {
        'date' : "July-September 2018",
        'location': "Jazz Networks",
        'role': "Software Engineer Intern"
    };
    const CompVision = {
        'date' : "July-August 2016",
        'location': "Computer Vision Laboratory, University of Nottingham",
        'role': "Deep Learning Research Intern"
    };
    return(
        <div className={styles.section}>
            <h2>Experience</h2>
            <Event date={JazzNetworks.date} location={JazzNetworks.location} role={JazzNetworks.role} logo={JazzLogo}>
            Worked in the Machine Learning team using a beta-VAE for unsupervised clustering techniques.
            </Event>
            <Event date={CompVision.date} location={CompVision.location} role={CompVision.role} logo={NottCompVision}>
            Used Fully Convolutional Networks for semantic segmentation.
            </Event>
        </div>

    );


}

export default WorkExperience;