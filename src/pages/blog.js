import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby"
import BlogCard from "../components/blog-card";
import BlogDescription from "../components/blog-description";
import styles from '../../css/blog.module.scss'
import SEO from "../components/seo";
import blogImg from '../../posts/demystifying-deep-learning/conv-net-backpropagation-maths-intuition-derivation/cnn-internals.png'

const Blog = ({data}) => {
    return (
     <Layout page="Blog">
        <SEO isBlogPost={false} title="Mukul's Blog" url="https://mukul-rathi.github.io/blog/" excerpt="Mukul's Personal Blog on Deep Learning and all things Computer Science" image={blogImg}/>
         <div className={styles.blog}>
            <h1>Hello World - Mukul's Blog! </h1>
            <BlogDescription className={styles.description}/> 
            {data.allMarkdownRemark.edges.map(({ node }, index) => (
                <BlogCard {...node} key={index} className={styles.blogCard}/>
                
            ))}
        </div>
     </Layout>
    );
}

export default Blog;

export const query = graphql`
query{
    allMarkdownRemark(
        sort: {fields: [frontmatter___date], order: DESC}
        ){
        edges{
        node{
          fields{
              slug
          }
          frontmatter {
            title
            date
            excerpt
            series
            part
            image{
                childImageSharp{
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
`