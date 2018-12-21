import React from "react"
import Layout from "../components/layout";
import HeroImage from "../components/homepage-sections/hero-image";
import Education from "../components/homepage-sections/education";
import WorkExperience from "../components/homepage-sections/work-experience";
import Projects from "../components/homepage-sections/projects";
import SEO from "../components/seo";
import HeroImg from '../../assets/hero-image.jpg'
const Home = () =>{
    return(
    <Layout page="Home">
        <SEO isBlogPost={false} title="Mukul's Personal Website" url="https://mukul-rathi.github.io/about-me/" excerpt="Mukul's Personal Website, powered by React, GatsbyJS and GraphQL" image={HeroImg}/>
        <HeroImage/>
        <Education/>
        <WorkExperience/>
        <Projects/>
    </Layout>
    );
}


export default Home