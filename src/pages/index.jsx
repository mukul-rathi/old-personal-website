import React from "react";
import Layout from "../components/layout/layout";
import HeroImage from "../components/homepage/hero-image";
import Experience from "../components/homepage/experience";
import Projects from "../components/homepage/projects";
import SEO from "../components/helmet/seo";
import HeroImg from "../../assets/hero-image.jpg";

const Home = () => {
  return (
    <Layout page="Home">
      <SEO
        isBlogPost={false}
        title="Mukul's Personal Website"
        url="https://mukulrathi.com/"
        excerpt="Mukul's Personal Website, powered by React, GatsbyJS and GraphQL"
        image={HeroImg}
      />
      <HeroImage />
      <Experience />
      <Projects />
    </Layout>
  );
};

export default Home;
