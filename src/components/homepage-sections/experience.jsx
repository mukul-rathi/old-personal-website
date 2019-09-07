import React from "react";

import { StaticQuery, graphql } from "gatsby";
import Event from "../event";
import styles from "../../../css/section.module.scss";

const Experience = () => (
  <StaticQuery
    query={graphql`
      {
        allFile(filter: { relativePath: { glob: "experience/*" } }) {
          edges {
            node {
              name
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
    render={data => {
      const findImage = name => {
        const images = data.allFile.edges;
        const correctImg = images.find(img => img.node.name === name);
        return correctImg.node.childImageSharp.fluid;
      };

      const experience = {
        Education: {
          batchDegree: {
            date: "2017-2020",
            location: "University of Cambridge",
            role: "B.A. (Hons) Computer Science",
            points: {
              "First Year Results":
                "Ranked 2nd out of 101 Computer Science students in my year. (First Class)",
              "Second Year Results":
                "Ranked 3rd out of 102 Computer Science students in my year. (First Class)"
            },
            logo: findImage("uni-of-cam")
          },
          school: {
            date: "2010-2017",
            location: "Nottingham High School",
            role: "GCSEs and A Levels",
            points: {
              "A Levels":
                "4 A*s in Maths, Further Maths, Physics and Chemistry",
              GCSEs: "11 A*s and A (top grade) in FSMQ Additional Maths"
            },
            logo: findImage("notts-high")
          }
        },
        Experience: {
          Facebook: {
            date: "June-September 2019",
            location: "Facebook",
            role: "Software Engineer Intern",
            points: {
              "":
                "Working in the Catalog Experience team using ReactJS and Hack."
            },
            logo: findImage("facebook")
          },
          JazzNetworks: {
            date: "July-September 2018",
            location: "Jazz Networks",
            role: "Software Engineer Intern",
            points: {
              "":
                "Worked in the Machine Learning team using a beta-VAE for unsupervised clustering."
            },
            logo: findImage("jazz-networks")
          },
          CompVision: {
            date: "July-August 2016",
            location: "Computer Vision Laboratory, University of Nottingham",
            role: "Deep Learning Research Intern",
            points: {
              "": "Used Fully Convolutional Networks for semantic segmentation."
            },
            logo: findImage("computer-vision-lab")
          }
        }
      };
      return (
        <>
          {Object.keys(experience).map(section => (
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>{section} </h2>
              {Object.values(experience[section]).map(event => (
                <Event {...event} />
              ))}
            </section>
          ))}
        </>
      );
    }}
  />
);

export default Experience;
