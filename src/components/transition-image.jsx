import React from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import styles from "../../css/transition-image.module.scss";

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
        <div className={styles.transitionImageDiv}>
          <div className={styles.transitionContent}>
            <h2 className={styles.transitionText}> Hackers at Cambridge</h2>
          </div>
        </div>
      </section>
    )}
  />
);
export default TransitionImage;
