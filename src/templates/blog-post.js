import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from '../../css/blog-post.module.css'
import { Helmet } from "react-helmet"
import { DiscussionEmbed } from 'disqus-react';

require("katex/dist/katex.min.css")
require("prismjs/themes/prism.css")

 const BlogPost = ({ data }) => {

  const post = data.markdownRemark;
  const disqusShortname = "https-mukul-rathi-github-io";
  const disqusConfig = {
    identifier: post.id,
    title: post.frontmatter.title,
  };

  return (
    <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{post.frontmatter.title}</title>
        </Helmet>
      <div className={styles.blogPost}>
        <h1 className={styles.title}>{post.frontmatter.title}</h1>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.html }} />
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
      
    </Layout>
  )
}

export default BlogPost;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        date
        series
        part
        caption
        excerpt
      }
    }
  }
`