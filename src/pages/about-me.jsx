import React from "react";
import Layout from "../components/layout";
import WhoAmI from "../components/about-me-sections/who-am-I";
import Workshops from "../components/about-me-sections/workshops";

import TransitionImage from "../components/transition-image";
import Hackathons from "../components/about-me-sections/hackathons";

import transitionImageStyles from "../../css/transition-image.module.scss";

import HaCImage from "../../assets/hac-image.jpg";
import SEO from "../components/seo";

const AboutMe = () => {
  return (
    <Layout page="About Me">
      <SEO
        isBlogPost={false}
        title="About Mukul Rathi"
        url="https://mukul-rathi.github.io/about-me/"
        excerpt="A bit about me and the activities I get up to"
        image={HaCImage}
      />
      <WhoAmI />
      <TransitionImage
        text="Hackers At Cambridge"
        className={transitionImageStyles.HaCImage}
      />
      <Hackathons />
      <Workshops />
    </Layout>
  );
};

export default AboutMe;
