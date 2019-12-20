import React from "react";
import { StaticQuery, graphql } from "gatsby";
import GridCards from "../card/grid-cards";
import styles from "../../../css/section.module.scss";

const Projects = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allFile(filter: { relativePath: { glob: "projects/*" } }) {
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
        const gridProps = {
          CleanCycle: {
            title: "Clean Cycle",
            img: {
              fluid: findImage("clean-cycle"),
              alt: "Heatmap of pollution"
            },
            date: "Feb-March 2019",
            category: "Group Project",
            socialButton: {
              href: "https://github.com/mukul-rathi/CleanCycle",
              img: "github"
            },
            link1: {
              href:
                "https://mukul-rathi.github.io/database-server-tutorial/docker-postgres-flask/",
              text: "Tutorial"
            },
            description:
              "Deployed a database server (to store air pollution data) using PostgreSQL, Docker and Flask - tested with Pytest and Travis CI."
          },
          HackCambridge2019: {
            title: "Out of the Vox",
            img: {
              fluid: findImage("HackCambridge"),
              alt: "Screenshot of App"
            },
            date: "January 2019",
            category: "Hackathon",
            socialButton: {
              href: "https://github.com/mukul-rathi/HackCambridge2019",
              img: "github"
            },
            link1: {
              href: "https://mn493.user.srcf.net/hc2019/",
              text: "View Demo"
            },
            description:
              "Finalist (top 6 out of 68) at HackCambridge 2019. Out of the Vox is a brainstorming website app that makes mind maps by only listening to your voice! "
          },
          CambridgeGameGigHack: {
            title: "Retro Game Design",
            img: {
              fluid: findImage("CambridgeGameGigHack"),
              alt: "Screenshot of Game"
            },
            date: "December 2017",
            category: "Hackathon",
            socialButton: {
              href: "https://github.com/mukul-rathi/CambridgeGameGigHack",
              img: "github"
            },
            description:
              "A horizontal shooter game designed at the Cambridge GameGig 2017 Hackathon using Lua and the Love platform."
          },
          OpenMined: {
            title: "OpenMined",
            img: {
              fluid: findImage("openmined"),
              alt: "OpenMined Logo"
            },
            date: "November 2018",
            category: "Open Source",
            socialButton: {
              href:
                "https://github.com/OpenMined/PySyft/blob/master/examples/torch/Boston_Housing_Federated_Training%20with%20Secure%20Aggregation%20and%20Diff%20Privacy.ipynb",
              img: "github"
            },
            description:
              "Contributed a demo notebook demonstrating the use of privacy-preserving machine learning techniques using the Pysyft library. "
          },
          OxfordHack: {
            title: "OxfordHack",
            img: {
              fluid: findImage("oxfordhack"),
              alt: "Oxford Hack Logo"
            },
            date: "November 2017",
            category: "Hackathon",
            link1: {
              href: "https://github.com/mukul-rathi/DeepDoc",
              text: "View on GitHub"
            },
            socialButton: {
              href: "https://www.youtube.com/watch?v=Ccl5iRXDHxY",
              img: "youtube"
            },
            description:
              "Built a dashboard to help doctors classify complicated diseases - used TensorFlow to train classifier."
          }
        };

        return (
          <section className={styles.section}>
            <h2>Projects</h2>
            {<GridCards {...gridProps} />}
          </section>
        );
      }}
    />
  );
};

export default Projects;
