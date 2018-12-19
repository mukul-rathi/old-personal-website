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
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            `gatsby-remark-katex`,
            
          ],
        },
      },
      `gatsby-plugin-react-helmet`,
      {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ['Oswald', 'Roboto', 'Open Sans', 'Montserrat', 'Raleway', 'PT Sans', 'Lato'
        ]
      }
    }
  ]
}
