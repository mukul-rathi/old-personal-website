import React from "react";
import { graphql, Link } from "gatsby";
import { DiscussionEmbed } from "disqus-react";
import dateFormat from "dateformat";

import Layout from "../components/layout";
import styles from "../../css/blog-post.module.scss";
import ShareBar from "../components/share-bar";
import SEO from "../components/seo";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism.css";
import MailChimpForm from "../components/mailchimp-form";
import TwitterCard from "../components/twitter-card";

function formatDate(date) {
  return dateFormat(date, "dS mmmm yyyy");
}
/* eslint-disable-next-line  react/prop-types */
const BlogPost = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const {
    title,
    date,
    series,
    part,
    image,
    excerpt,
    FAQs,
    caption
  } = post.frontmatter;
  const url = `https://mukulrathi.com${post.fields.slug}`;
  const disqusShortname = "https-mukul-rathi-github-io";
  const disqusConfig = {
    identifier: post.id,
    title
  };
  const { nextPost, prevPost } = pageContext;
  const {
    srcSetWebp,
    srcWebp,
    presentationWidth,
    presentationHeight
  } = image.childImageSharp.fluid;
  return (
    <Layout>
      <SEO
        isBlogPost
        title={title}
        url={url}
        excerpt={excerpt}
        image={image}
        date={date}
        FAQs={FAQs}
      />

      <main className={styles.blogPost}>
        <div className={styles.series}>
          <h2> {series}</h2> {(part || part === 0) && <h2>: Part {part} </h2>}
        </div>

        <h1 className={styles.title}> {title} </h1>
        <h2 className={styles.date}> {formatDate(date)}</h2>

        <ShareBar className={styles.shareBar} url={url} />
        <amp-img
          src-set={srcSetWebp}
          src={srcWebp}
          width={presentationWidth}
          height={presentationHeight}
          alt={caption}
          layout="responsive"
        >
          <div fallback>{caption}</div>
        </amp-img>

        {/* eslint-disable react/no-danger */}
        <article
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        {/* eslint-enable react/no-danger */}
        <TwitterCard />

        <nav className={styles.pageNavigation}>
          {prevPost && (
            <Link className={styles.pageNavButton} to={prevPost.fields.slug}>
              <div> {prevPost.frontmatter.title} </div>
            </Link>
          )}

          {nextPost && (
            <Link className={styles.pageNavButton} to={nextPost.fields.slug}>
              <div> {nextPost.frontmatter.title} </div>
            </Link>
          )}
        </nav>

        <MailChimpForm />

        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </main>
    </Layout>
  );
};

export default BlogPost;

// can use slug from context in gatsby-node as a variable in GraphQl
// $slug
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      fields {
        slug
      }
      frontmatter {
        title
        date
        series
        part
        image {
          childImageSharp {
            fluid {
              srcSet
              src
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
