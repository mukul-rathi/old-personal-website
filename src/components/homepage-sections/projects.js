import React from 'react'
import Project from '../project';

const Projects = ()=>{
    return(
        <div>
            <h1>Projects</h1>
            <Project title="Retro Game Design" srcCode="https://github.com/mukul-rathi/CambridgeGameGigHack">
                This was a horizontal shooter game designed at the Cambridge GameGig 2017 Hackathon using Lua and the Love platform.  
            </Project>
        </div>

    );


}

export default Projects;