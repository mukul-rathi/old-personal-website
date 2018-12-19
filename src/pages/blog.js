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
          fields{
              slug
          }
          frontmatter {
            title
            comments
            date
            excerpt
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