import React from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import styles from "../../../css/transition-image.module.scss";

const TransitionImage = () => (
  <StaticQuery
    query={graphql`
      {
        allFile(filter: { name: { eq: "hac-image" } }) {
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
      <section className={styles.wrapper}>
        <Img
          fluid={data.allFile.edges[0].node.childImageSharp.fluid}
          className={styles.transitionImage}
        />
      </section>
    )}
  />
);
export default TransitionImage;
