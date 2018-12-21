import React from 'react'
import { Helmet } from "react-helmet"

const SEO = (props) =>{
    const {title, image,url, isBlogPost, excerpt} = props;
return(
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
            <meta name="description" content={excerpt} />
            <meta name="image" content={image} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            {isBlogPost && <meta property="og:type" content="article" />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={excerpt} />
            <meta property="og:image" content={image} />
            {//<meta property="fb:app_id" content={seo.social.fbAppID} />}
            }
            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={excerpt} />
            <meta name="twitter:image" content={image} />

        </Helmet>
    );
}

export default SEO;