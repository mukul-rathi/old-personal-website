import React from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import styles from "../../../css/who-am-I.module.scss";
const WhoAmI = () => (
  <StaticQuery
    query={graphql`
      {
        allFile(filter: { name: { eq: "profile-pic" } }) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <section className={styles.whoAmI}>
        <h1 className={styles.mainHeading}>About Me</h1>
        <div className={styles.flexLayout}>
          <div className={styles.profilePic}>
            <Img
              className={styles.img}
              fluid={data.allFile.edges[0].node.childImageSharp.fluid}
              alt="Mukul Rathi"
            />
          </div>
          <article className={styles.description}>
            <p>
              Hey there! Welcome to my personal website! A bit about me -{" "}
              {"I'm"} a third year Computer Science student at the University of
              Cambridge with an interest in all things deep learning!
            </p>
            <p>
              This website is here to showcase some of the side projects{" "}
              {"I've"} been working on, as well as being a project in itself -{" "}
              {"I'm"} using this website to teach myself web development (in
              particular this website uses React, GatsbyJS and GraphQL).
            </p>
            <p>
              In my free time at Cambridge, I am a core member of the{" "}
              <a href="https://hackersatcambridge.com">Hackers at Cambridge</a>{" "}
              committee - I am the Workshop Overseer and Events Overseer. As
              Workshop Overseer, I organise and coordinate student-run workshops
              on different areas of computer science, some of which I present
              myself. As Events Overseer, I am responsible for leading the
              organisation of the weekly HaC nights, as well as the hackathons
              held at the end of each term.
            </p>
          </article>
        </div>
      </section>
    )}
  />
);

export default WhoAmI;
