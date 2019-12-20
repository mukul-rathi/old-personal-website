import React from "react";
import SocialButton from "../card/social-button";
import styles from "../../../css/footer.module.scss";

const Footer = () => (
  <footer>
    <SocialButton img="rss" href="/rss.xml" className={styles.socialButton} />{" "}
    <SocialButton
      href="https://www.linkedin.com/in/mukul-rathi-17230014a/"
      img="linkedIn"
      className={styles.socialButton}
    />
    <SocialButton
      img="github"
      href="http://github.com/mukul-rathi"
      className={styles.socialButton}
    />
    <SocialButton
      href="https://twitter.com/mukulrathi_"
      img="twitter"
      className={styles.socialButton}
    />
    <div className={styles.copyrightText}>© Mukul Rathi 2018 </div>
  </footer>
);

export default Footer;
