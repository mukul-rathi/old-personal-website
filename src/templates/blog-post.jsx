/* eslint react/prop-types: 0 */
import React from "react";
import { graphql, Link } from "gatsby";
import { DiscussionEmbed } from "disqus-react";
import Img from "gatsby-image";
import dateFormat from "dateformat";
import { Helmet } from "react-helmet";

import Layout from "../components/layout";
import styles from "../../css/blog-post.module.scss";
import ShareBar from "../components/share-bar";
import SEO from "../components/seo";
import "prismjs/themes/prism.css";
import MailChimpForm from "../components/mailchimp-form";
import TwitterCard from "../components/twitter-card";

function formatDate(date) {
  return dateFormat(date, "dS mmmm yyyy");
}

const BlogPost = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const {
    title,
    datePublished,
    dateModified,
    series,
    part,
    image,
    excerpt,
    FAQs,
    caption,
    include_KaTeX // eslint-disable-line camelcase
  } = post.frontmatter;
  // eslint-disable-next-line camelcase
  if (include_KaTeX) {
    //   require("katex/dist/katex.min.css"); // eslint-disable-line global-require
  }
  const url = `https://mukulrathi.com${post.fields.slug}`;
  const disqusShortname = "https-mukul-rathi-github-io";
  const disqusConfig = {
    identifier: post.id,
    title
  };
  const { nextPost, prevPost } = pageContext;

  return (
    <Layout>
      <SEO
        isBlogPost
        title={title}
        url={url}
        excerpt={excerpt}
        image={image}
        datePublished={datePublished}
        dateModified={dateModified}
        FAQs={FAQs}
      />
      {/* eslint-disable-next-line camelcase */}
      {include_KaTeX && (
        <Helmet>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
            integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
            crossOrigin="anonymous"
          />
        </Helmet>
      )}
      <main className={styles.blogPost}>
        <div className={styles.series}>
          <h2> {series}</h2> {(part || part === 0) && <h2>: Part {part} </h2>}
        </div>

        <h1 className={styles.title}> {title} </h1>
        <h2 className={styles.date}> {formatDate(datePublished)}</h2>

        <ShareBar className={styles.shareBar} url={url} />
        {dateModified && (
          <h2 className={styles.lastUpdated}>
            Last updated on {formatDate(dateModified)}
          </h2>
        )}

        <Img fluid={image.childImageSharp.fluid} alt={caption} />

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
