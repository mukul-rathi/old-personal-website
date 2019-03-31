import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from "react-share";

import styles from "../../css/share-bar.module.scss";
import SocialButton from "./social-button";

const CardShareBar = props => {
  const { url, className } = props;
  return (
    <div className={classNames(styles.shareBar, className)}>
      <FacebookShareButton url={url} className={styles.icon}>
        <SocialButton img="facebook" href={url} />
      </FacebookShareButton>
      <LinkedinShareButton url={url} className={styles.icon}>
        <SocialButton img="linkedIn" href={url} />
      </LinkedinShareButton>
      <TwitterShareButton url={url} className={styles.icon}>
        <SocialButton img="twitter" href={url} />
      </TwitterShareButton>
    </div>
  );
};

CardShareBar.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired
};

CardShareBar.defaultProps = {
  className: ""
};

export default CardShareBar;
