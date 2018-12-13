import React from 'react'
import Event from '../event';

const Education = ()=>{
    const BatchDegree = {
        'date': "2017 - 2020",
        'location': "University of Cambridge",
        'educationLevel': "B.A. (Hons) in Computer Science"
    }
    const School = {
        'date': '2010-2017',
        'location': "Nottingham High School",
        'educationLevel': "GCSEs and A Levels"
    }
    return(
        <div>
            <h2>Education</h2>
            <Event date={BatchDegree.date} location={BatchDegree.location} role={BatchDegree.educationLevel}>
            <ul>
            <li>First Year Results: Ranked 2nd out of 101 Computer Science students in my year. (First Class)</li>
            </ul>
            </Event>
            <Event date={School.date} location={School.location} role={School.educationLevel}>
            <ul>
            <li>A Levels: 4 A*s in Maths, Further Maths, Physics and Chemistry</li>
            <li>GCSEs: 11 A*s and A (top grade) in FSMQ Additional Maths</li>
            </ul>
            </Event>
        </div>

    );


}

export default Education;