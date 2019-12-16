import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import BlogPostLayout from "../components/blog-post-layout";
import styles from "../../css/blog-post.module.scss";

/* eslint-disable-next-line  react/prop-types */
const BlogPost = ({ data, pageContext }) => {
  const post = data.mdx;
  const { image, caption } = post.frontmatter;
  const {
    src,
    srcWebp,
    presentationWidth,
    presentationHeight
  } = image.childImageSharp.fluid;
  return (
    <BlogPostLayout post={post} pageContext={pageContext}>
      <amp-img
        src={srcWebp}
        width={presentationWidth}
        height={presentationHeight / 2} // hack to fix the aspect ratio
        alt={caption}
        layout="responsive"
      >
        <div fallback>
          <amp-img
            src={src}
            width={presentationWidth}
            height={presentationHeight / 2} // hack to fix the aspect ratio
            alt={caption}
            layout="responsive"
          />
        </div>
      </amp-img>
      <article className={styles.content}>
        <MDXRenderer>{post.body}</MDXRenderer>
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
            fluid {
              src
              srcWebp
              presentationWidth
              presentationHeight
            }
          }
        }
        excerpt
        FAQs {
          question
          answer
        }
        caption
      }
    }
  }
`;
