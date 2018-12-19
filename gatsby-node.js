const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

// uses Gatsby createNodeField API
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
      // create URL slug for all markdown blog posts
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    //graphQL mutation query - adds slug field to node
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

//Gatsby createPages API
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        //first query the data using graphQL
      graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `
  ).then(result => {
    //for each markdown file, create a corresponding page using the blog-posttemplate
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}