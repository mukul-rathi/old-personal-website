import React from "react";
import classNames from "classnames";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from "react-share";

import styles from "../../css/share-bar.module.scss";
import SocialButton from "./social-button";

const CardShareBar = props => (
  <div className={classNames(styles.shareBar, props.className)}>
    <FacebookShareButton url={props.url} className={styles.icon}>
      <SocialButton img="facebook" href={props.url} />
    </FacebookShareButton>
    <LinkedinShareButton url={props.url} className={styles.icon}>
      <SocialButton img="linkedIn" href={props.url} />
    </LinkedinShareButton>
    <TwitterShareButton url={props.url} className={styles.icon}>
      <SocialButton img="twitter" href={props.url} />
    </TwitterShareButton>
  </div>
);

export default CardShareBar;
