import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby"
import BlogCard from "../components/blog-card";
import BlogDescription from "../components/blog-description";
import styles from '../../css/blog.module.css'


const Blog = ({data}) => {
    return (
     <Layout page="Blog">
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