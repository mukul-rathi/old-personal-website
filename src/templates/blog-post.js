import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from '../../css/blog-post.module.css'
import { Helmet } from "react-helmet"
require(`katex/dist/katex.min.css`)

 const BlogPost = ({ data }) => {

  const post = data.markdownRemark    
  return (
    <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{post.frontmatter.title}</title>
        </Helmet>
      <div className={styles.blogPost}>
        <h1 className={styles.title}>{post.frontmatter.title}</h1>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export default BlogPost;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        series
        part
        image
        caption
        excerpt
      }
    }
  }
`