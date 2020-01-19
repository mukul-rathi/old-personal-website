module.exports = {
  siteMetadata: {
    title: `Mukul's Blog`,
    description: `Mukul Rathi's personal website and blog`,
    siteUrl: `https://mukulrathi.com`
  },
  plugins: [
    `gatsby-plugin-sass`, {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected:
            true,       // Print removed selectors and processed file names
        develop: true,  // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore
        // files/folders
        purgeOnly: ['css/']  // Purge only these files/folders
      }
    },
    {
      resolve: `gatsby-plugin-minify-classnames`,
      options: {
        develop: true  // Enable on `gatsby develop`
      }
    },
    `gatsby-transformer-sharp`, `gatsby-plugin-sharp`, {
      resolve: `gatsby-source-filesystem`,
      options: {name: `posts`, path: `${__dirname}/posts/`}
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {name: `assets`, path: `${__dirname}/assets/`}
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Mukul\'s Personal Website and Blog',
        short_name: 'Mukul\'s Blog',
        start_url: '/',
        background_color: '#6b37bf',
        theme_color: '#6b37bf',
        // Enables "Add to Homescreen" prompt and disables browser UI (including
        // back button) see
        // https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon:
            'assets/icon.png'  // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-offline`, {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [{
          serialize: ({query: {site, allMdx}}) => {
            return allMdx.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.datePublished,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{'content:encoded': edge.node.html}]
              });
            });
          },
          query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___datePublished] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        datePublished
                      }
                    }
                  }
                }
              }
            `,
          output: '/rss.xml',
          title: 'Mukul\'s Blog\'s RSS Feed'
        }]
      }
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-124576029-2`,
        // Puts tracking script in the head instead of the body
        head: false
      }
    },
    `gatsby-plugin-sitemap`, `gatsby-plugin-robots-txt`, {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from
              // https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          },
          `gatsby-remark-autolink-headers`, `gatsby-remark-copy-linked-files`, {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the
              // code.
              // To use it, add the following line in src/layouts/index.js
              // right after importing the prism color scheme:
              //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight
              // inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              showCaptions: ['title'],
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.

              maxWidth: 650
            }
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`, {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {fonts: [{family: `Lato`}, {family: `Open Sans`}]}
    },
    {
      resolve: `gatsby-plugin-google-amp`,
      options: {
        analytics: {
          type: 'gtag',
          dataCredentials: 'include',
          config: {
            vars: {
              gtag_id: 'UA-124576029-2',
              config: {'UA-124576029-2': {page_location: '{{pathname}}'}}
            }
          }
        },
        canonicalBaseUrl: 'https://mukulrathi.com',
        components: ['amp-form'],
        excludedPaths: ['/404*', '/'],
        pathIdentifier: '/amp/',
        relAmpHtmlPattern: '{{canonicalBaseUrl}}{{pathname}}{{pathIdentifier}}',
        useAmpClientIdApi: true
      }
    },
    // make sure to put last in the array
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {},  // option to add more headers. `Link` headers are
        // transformed by the below criteria
        allPageHeaders: [
          'Link: https://www.google-analytics.com; rel=preload; as=script'
        ],  // option to add headers for all pages. `Link` headers are
        // transformed by the below criteria
        mergeSecurityHeaders:
            true,  // boolean to turn off the default security headers
        mergeLinkHeaders:
            true,  // boolean to turn off the default gatsby js headers
        mergeCachingHeaders:
            true,  // boolean to turn off the default caching headers
        generateMatchPathRewrites:
            true  // boolean to turn off automatic creation of redirect rules
        // for client only paths
      }
    }
  ]
};
