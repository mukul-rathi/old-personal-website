import React from "react";
import Layout from "../components/layout";
import WhoAmI from "../components/about-me-sections/who-am-I";
import Workshops from "../components/about-me-sections/workshops";

import TransitionImage from '../components/transition-image'
import Hackathons from "../components/about-me-sections/hackathons";

const AboutMe = () => {
    return (
        <Layout>
            <WhoAmI/>
            <TransitionImage text="Hackers At Cambridge"/>
            <Hackathons/>
            <Workshops/>
        </Layout>
    );
}

export default AboutMe;