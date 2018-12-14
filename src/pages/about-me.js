import React from "react";
import Layout from "../components/layout";
import WhoAmI from "../components/about-me-sections/who-am-I";
import Workshops from "../components/about-me-sections/workshops";

import TransitionImage from '../components/transition-image'
import Hackathons from "../components/about-me-sections/hackathons";

import transitionImageStyles from '../../css/transition-image.module.css'

const AboutMe = () => {
    return (
        <Layout page="About Me">
            <WhoAmI/>
            <TransitionImage text="Hackers At Cambridge" className={transitionImageStyles.HaCImage}/>
            <Hackathons/>
            <Workshops/>
        </Layout>
    );
}

export default AboutMe;