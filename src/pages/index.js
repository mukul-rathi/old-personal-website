import React from "react"
import Layout from "../components/layout";
import HeroImage from "../components/homepage-sections/hero-image";
import Education from "../components/homepage-sections/education";
import WorkExperience from "../components/homepage-sections/work-experience";
import Projects from "../components/homepage-sections/projects";

const Home = () =>{
    return(
    <Layout page="Home">
        <HeroImage/>
        <Education/>
        <WorkExperience/>
        <Projects/>
    </Layout>
    );
}


export default Home