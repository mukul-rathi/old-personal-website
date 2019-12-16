/* eslint react/prop-types: 0 */
import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Helmet } from "react-helmet";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import BlogPostLayout from "../components/blog-post-layout";
import styles from "../../css/blog-post.module.scss";

const BlogPost = ({ data, pageContext }) => {
  const post = data.mdx;
  const { image, caption } = post.frontmatter;
  return (
    <BlogPostLayout post={post} pageContext={pageContext}>
      {/* eslint-disable-next-line camelcase */}
      {post.frontmatter.include_KaTeX && (
        <Helmet>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
            integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
            crossOrigin="anonymous"
          />
        </Helmet>
      )}
      <Img fluid={image.childImageSharp.fluid} alt={caption} />

      <article className={styles.content}>
        <MDXProvider components={{}}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>
      </article>
    </BlogPostLayout>
  );
};

export default BlogPost;

// can use slug from context in gatsby-node as a variable in GraphQl
// $slug
export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      id
      fields {
        slug
      }
      frontmatter {
        title
        datePublished
        dateModified
        series
        part
        image {
          childImageSharp {
            fluid(maxWidth: 630) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        excerpt
        FAQs {
          question
          answer
        }
        caption
        include_KaTeX
      }
    }
  }
`;
