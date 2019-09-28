import React from "react";
import { TwitterFollowButton } from "react-twitter-embed";

import styles from "../../css/twitter-card.module.scss";

const TwitterCard = () => {
  return (
    <section className={styles.twitterCard}>
      <div className={styles.mainContent}>
        <div className={styles.headings}>
          <h3 className={styles.title}> Follow me on Twitter</h3>
        </div>
        <div className={styles.description}>
          I tweet whenever my posts drop.
          <div className={styles.followButton}>
            <TwitterFollowButton
              screenName="mukulrathi_"
              options={{ size: "large", showCount: "false" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default TwitterCard;
