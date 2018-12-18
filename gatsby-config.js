module.exports = {
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts`,
          path: `${__dirname}/posts/`,
        },
      },
      `gatsby-transformer-remark`,
      {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ['Oswald', 'Roboto', 'Open Sans', 'Montserrat', 'Raleway', 'PT Sans', 'Lato'
        ]
      }
    }
  ]
}
