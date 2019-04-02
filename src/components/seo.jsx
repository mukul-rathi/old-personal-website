import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import profileImg from "../../assets/profile-pic.jpg";

const SEO = props => {
  const { title, image, url, isBlogPost, excerpt, date } = props;
  let imageUrl = "https://mukulrathi.com";
  if (image.childImageSharp) {
    imageUrl += image.childImageSharp.fluid.src;
  } else {
    imageUrl += JSON.stringify(image);
  }
  let structuredData = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url,
      name: title
    }
  ];
  if (isBlogPost) {
    // special rich snippets
    structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Blog",
            item: "https://mukulrathi.com/blog"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: url
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        datePublished: date,
        dateModified: date,
        author: {
          "@type": "Person",
          name: "Mukul Rathi"
        },
        publisher: {
          "@type": "Organization",
          name: "Mukul Rathi",
          logo: {
            "@type": "ImageObject",
            url: "https://mukulrathi.com" + profileImg
          }
        },
        image: {
          "@type": "ImageObject",
          url: imageUrl
        },
        inLanguage: "English",
        description: excerpt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url
        }
      }
    ];
  }
  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={excerpt} />
      <meta name="image" content={imageUrl} />
      <meta name="author" content="Mukul Rathi" />

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isBlogPost && <meta property="og:type" content="article" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:image" content={imageUrl} />
      {
        // <meta property="fb:app_id" content={seo.social.fbAppID} />}
      }
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={excerpt} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isBlogPost: PropTypes.bool.isRequired,
  excerpt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default SEO;
