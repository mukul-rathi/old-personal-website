module.exports = {
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts`,
          path: `${__dirname}/posts/`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `assets`,
          path: `${__dirname}/assets/`
        }
      },
      `gatsby-transformer-remark`,
      `gatsby-transformer-sharp`, 
      `gatsby-plugin-sharp`,
      {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ['Oswald', 'Roboto', 'Open Sans', 'Montserrat', 'Raleway', 'PT Sans', 'Lato'
        ]
      }
    },
    'gatsby-redirect-from',
    'gatsby-plugin-meta-redirect' // make sure this is always the last one
  ]
}
