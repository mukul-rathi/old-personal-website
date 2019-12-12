import React from "react";
import { StaticQuery, graphql } from "gatsby";
import GridCards from "../grid-cards";
import styles from "../../../css/section.module.scss";

const Hackathons = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allFile(filter: { relativePath: { glob: "hackathons/*" } }) {
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

        const hackathons = {
          GreenHack: {
            title: "GreenHack",
            img: {
              fluid: findImage("greenhack"),
              alt: "GreenHack Logo"
            },
            date: "March 2018",
            category: "Sustainability",
            link1: {
              href: "https://greenhack.hackersatcambridge.com/",
              text: "GreenHack Website"
            },
            link2: {
              href:
                "https://blogs.msdn.microsoft.com/uk_faculty_connection/2018/04/07/greenhack-iot-sustainability-hackathon-using-azure-services/",
              text: "Microsoft Blog Post"
            },

            socialButton: {
              href: "https://www.facebook.com/events/694391484282782/",
              img: "facebook"
            },
            description:
              "Led the publicity, updated the GreenHack website with project ideas and part of judging panel on the day."
          },
          GameGig2018: {
            title: "Cambridge Game Gig 2018",
            img: {
              fluid: findImage("gamegig-2018"),
              alt: "Game Gig Logo"
            },
            date: "December 2018",
            category: "Game Design",
            link1: {
              href: "https://hackersatcambridge.com/gamegig",
              text: "GameGig Website"
            },
            socialButton: {
              href:
                "https://www.facebook.com/events/https://www.facebook.com/events/1720940534684424/",
              img: "facebook"
            },
            description:
              "Lead Organiser of GameGig: responsibilities including liasing with sponsors, booking venue and running and judging event on day"
          },
          GameGig2019: {
            title: "Cambridge Game Gig 2019",
            img: {
              fluid: findImage("gamegig-2019"),
              alt: "Game Gig Logo"
            },
            date: "December 2019",
            category: "Game Design",
            link1: {
              href: "https://game-gig-countdown.netlify.com/",
              text: "GameGig Website"
            },
            socialButton: {
              href: "https://www.facebook.com/events/605470026656645/",
              img: "facebook"
            },
            description: "Lead Organiser of GameGig"
          }
        };

        return (
          <section className={styles.section}>
            <h2>Hackathons</h2>
            {<GridCards {...hackathons} />}
          </section>
        );
      }}
    />
  );
};

export default Hackathons;
