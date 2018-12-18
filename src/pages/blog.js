import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby"
import BlogCard from "../components/blog-card";


const Blog = ({data}) => {
    return (
        <Layout page="Blog">
            <h1>Blog </h1>
            <p> This is my blog stub. </p> 
            {data.allMarkdownRemark.edges.map(({ node }, index) => (
                BlogCard(node)
            ))}
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
          fileAbsolutePath
          frontmatter {
            title
            layout
            comments
            date
            excerpt
            _PARENT
            series
            part
            image
            caption
          }
        }
      }
    }
  }
`