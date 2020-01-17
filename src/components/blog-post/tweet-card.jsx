import { TwitterShareButton } from "react-twitter-embed";
import styles from "../../../css/tweet-card.module.scss";

import React from "react";

const TweetCard = props => (
  <div className={styles.tweetCard}>
    <div className={styles.mainContent}>
      {props.children}

      <TwitterShareButton
        url={"https://mukulrathi.com" + props.slug}
        options={{
          size: "large",
          text: props.children.props.children,
          via: "mukulrathi_"
        }}
      />
    </div>
  </div>
);

export default TweetCard;
