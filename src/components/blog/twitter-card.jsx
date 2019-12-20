import React from "react";
import { TwitterFollowButton } from "react-twitter-embed";
import styles from "../../../css/twitter-card.module.scss";

const TwitterCard = () => {
  return (
    <section className={styles.twitterCard}>
      <div className={styles.mainContent}>
        <div className={styles.headings}>
          <h3 className={styles.title}> {"Let's "} talk on Twitter?</h3>
        </div>
        <div className={styles.description}>
          {"I'd "} love to hear your thoughts: always looking for feedback and
          will do my best to answer any questions you might have! I tweet{" "}
          <a href="https://twitter.com/mukulrathi_">@mukulrathi_</a>whenever any{" "}
          <strong>new posts</strong> drop.
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
