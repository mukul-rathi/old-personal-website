import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import BlogCard from "../components/blog-card";
import BlogDescription from "../components/blog-description";
import styles from "../../css/blog.module.scss";
import SEO from "../components/seo";
import blogImg from "../../posts/demystifying-deep-learning/conv-net-backpropagation-maths-intuition-derivation/cnn-internals.png";
import MailChimpForm from "../components/mailchimp-form";
import TwitterCard from "../components/twitter-card";

const Blog = ({ data }) => {
  return (
    <Layout page="Blog">
      <SEO
        isBlogPost={false}
        title="Mukul's Blog"
        url="https://mukul-rathi.github.io/blog/"
        excerpt="Mukul's Personal Blog on Deep Learning and all things Computer Science"
        image={blogImg}
      />
      <div className={styles.blog}>
        <h1>Hello World - {"Mukul's"} Blog! </h1>
        <BlogDescription className={styles.description} />
        <TwitterCard />
        <MailChimpForm />
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <BlogCard {...node} key={node.id} className={styles.blogCard} />
        ))}
      </div>
    </Layout>
  );
};

export default Blog;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            excerpt
            series
            part
            image {
              childImageSharp {
                fluid(maxWidth: 630) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            caption
          }
        }
      }
    }
  }
`;
