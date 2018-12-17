import React from 'react'
import Event from '../event';
import styles from '../../../css/section.module.css'
import UniOfCam from '../../../assets/logos/uni-of-cam.png'
import NottsHigh from '../../../assets/logos/notts-high.jpg'
const Education = ()=>{
    const BatchDegree = {
        'date': "2017-2020",
        'location': "University of Cambridge",
        'educationLevel': "B.A. (Hons) Computer Science"
    }
    const School = {
        'date': '2010-2017',
        'location': "Nottingham High School",
        'educationLevel': "GCSEs and A Levels"
    }
    return(
        <div className={styles.section}>
            <h2 className={styles.sectionHeading}>Education</h2>
            <Event date={BatchDegree.date} location={BatchDegree.location} role={BatchDegree.educationLevel} logo={UniOfCam}>
            <strong>First Year Results:</strong> Ranked 2nd out of 101 Computer Science students in my year. (First Class)
            </Event>
            <Event date={School.date} location={School.location} role={School.educationLevel} logo={NottsHigh}>
            <p><strong>A Levels:</strong> 4 A*s in Maths, Further Maths, Physics and Chemistry</p>
            <p><strong>GCSEs:</strong> 11 A*s and A (top grade) in FSMQ Additional Maths</p>
            </Event>
        </div>

    );


}

export default Education;