const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

// uses Gatsby createNodeField API
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    // create URL slug for all markdown blog posts
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    // graphQL mutation query - adds slug field to node
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};

// Gatsby createPages API
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise(resolve => {
    // first query the data using graphQL

    // we sort the files in terms of date created
    // we  return the slug and the title
    graphql(`
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                redirect_from
              }
            }
          }
        }
      }
    `).then(result => {
      // for each markdown file, create a corresponding page using the blog-post template
      const posts = result.data.allMarkdownRemark.edges;

      posts.forEach(({ node }, index) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.jsx`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
            // prev and next are the previous and next posts
            // we queried their title to use in the prev/next buttons in hte blog post template
            prevPost: index === 0 ? null : posts[index - 1].node,
            nextPost: index === posts.length - 1 ? null : posts[index + 1].node
          }
        });
        createRedirect({
          fromPath: String(node.frontmatter.redirect_from),
          toPath: String(node.fields.slug),
          isPermanent: true
        });
      });

      resolve();
    });
  });
};
