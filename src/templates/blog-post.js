import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styles from '../../css/blog-post.module.css'
import { DiscussionEmbed } from 'disqus-react';
import Img from 'gatsby-image'
import ShareBar from "../components/share-bar";
import SEO from "../components/seo";
require("katex/dist/katex.min.css")
require("prismjs/themes/prism.css")


function formatDate(date){
  let dateFormat = require('dateformat');
  return dateFormat(date, "dS mmmm yyyy");
  
}


 const BlogPost = ({ data, pathContext }) => {


  const post = data.markdownRemark;
  const {title,date,series,part,image, excerpt} = post.frontmatter;
  const url = "https://mukul-rathi.github.io" + post.fields.slug;
  const disqusShortname = "https-mukul-rathi-github-io";
  const disqusConfig = {
    identifier: post.id,
    title: title,
  };
  const { nextPost, prevPost} = pathContext;
  return (
    <Layout>
        <SEO isBlogPost={true} title={title} url={url} excerpt={excerpt} image={image}/>
        
        <div className={styles.blogPost}>
        <div className={styles.series}>
         <h2> {series}</h2> {(part || part===0) && <h2>: Part {part} </h2>}
         </div>
          <h1 className={styles.title}> {title} </h1>
          <h2 className={styles.date}> {formatDate(date)}</h2>
          <Img fluid={image.childImageSharp.fluid}/>
          <ShareBar className={styles.shareBar}/>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.html }}/>
        
          <div className={styles.pageNavigation}>
              {prevPost &&  <Link className={styles.pageNavButton} to={prevPost.fields.slug}>
                {prevPost.frontmatter.title}
              </Link> }

            {nextPost &&
              <Link className={styles.pageNavButton} to={nextPost.fields.slug}>
                {nextPost.frontmatter.title}
              </Link>}
            </div>

           <div className= {styles.comments}>

            <DiscussionEmbed shortname={disqusShortname} config=  {disqusConfig} />
            </div>
          </div>

    </Layout>
  )
}

export default BlogPost;

//can use slug from context in gatsby-node as a variable in GraphQl
// $slug 
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      fields{
        slug
      }
      frontmatter {
        title
        date
        series
        part
        image{
          childImageSharp{
              fluid(maxWidth: 630) {
                  ...GatsbyImageSharpFluid
              }
          }
        }
        excerpt
      }
    }
  }
`