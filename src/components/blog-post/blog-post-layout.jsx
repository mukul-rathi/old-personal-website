import React from "react";
import Layout from "../layout/layout";
import { Link } from "gatsby";
import TwitterCard from "../blog/twitter-card";

import SEO from "../helmet/seo";
import dateFormat from "dateformat";

import "prismjs/themes/prism.css";
import styles from "../../../css/blog-post.module.scss";

function formatDate(date) {
  return dateFormat(date, "dS mmmm yyyy");
}

const BlogPostLayout = props => {
  const {
    title,
    datePublished,
    dateModified,
    series,
    part,
    image,
    excerpt,
    FAQs
  } = props.post.frontmatter;
  const { nextPost, prevPost } = props.pageContext;

  const url = `https://mukulrathi.com${props.post.fields.slug}`;

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
      <main className={styles.blogPost}>
        <div className={styles.series}>
          <h2> {series}</h2> {(part || part === 0) && <h2>: Part {part} </h2>}
        </div>

        <h1 className={styles.title}> {title} </h1>
        <h2 className={styles.date}> {formatDate(datePublished)}</h2>

        {dateModified && (
          <h2 className={styles.lastUpdated}>
            Last updated on {formatDate(dateModified)}
          </h2>
        )}

        {props.children}
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
      </main>
    </Layout>
  );
};

export default BlogPostLayout;
