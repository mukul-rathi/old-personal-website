/* eslint react/prop-types: 0 */
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/layout";
import BlogCard from "../components/blog/blog-card";
import BlogDescription from "../components/blog/blog-description";
import styles from "../../css/blog.module.scss";
import SEO from "../components/helmet/seo";
import blogImg from "../../posts/dummy/tests.png";
import TwitterCard from "../components/blog/twitter-card";

const Blog = ({ data }) => {
  const postURLs = data.allMdx.edges.map(
    ({ node }) => `https://mukulrathi.com${node.fields.slug}`
  );
  return (
    <Layout page="Blog">
      <SEO
        isBlogPost={false}
        title="Mukul's Blog"
        url="https://mukulrathi.com/blog/"
        excerpt="Mukul's Personal Blog on Deep Learning and all things Computer Science"
        image={blogImg}
        blogPosts={postURLs}
      />
      <div className={styles.blog}>
        <h1>Hello World - {"Mukul's"} Blog! </h1>
        <BlogDescription className={styles.description} />
        <TwitterCard />
        {data.allMdx.edges.map(({ node }) => (
          <BlogCard {...node} key={node.id} className={styles.blogCard} />
        ))}
      </div>
    </Layout>
  );
};

export default Blog;

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___datePublished], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            datePublished
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
