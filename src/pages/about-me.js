import React from "react";
import Layout from "../components/layout";
import WhoAmI from "../components/about-me-sections/who-am-I";
import Hackathons from "../components/about-me-sections/hackathons";
import Workshops from "../components/about-me-sections/workshops";

const AboutMe = () => {
    return (
        <Layout>
            <WhoAmI/>
            <TransitionImage text="Hackathons"/>
            <Hackathons/>
            <TransitionImage text="Workshops"/>
            <Workshops/>
        </Layout>
    );
}

export default AboutMe;