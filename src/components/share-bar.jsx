import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
/* eslint-disable import/no-duplicates */

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  RedditIcon,
  EmailIcon
} from "react-share";
/* eslint-enable import/no-duplicates */

import styles from "../../css/share-bar.module.scss";

const ShareBar = props => {
  const { url, className } = props;
  return (
    <div className={classNames(styles.shareBar, className)}>
      <FacebookShareButton url={url} className={styles.icon}>
        <FacebookIcon size={48} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} className={styles.icon}>
        <TwitterIcon size={48} round />
      </TwitterShareButton>
      <WhatsappShareButton url={url} className={styles.icon}>
        <WhatsappIcon size={48} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={url} className={styles.icon}>
        <LinkedinIcon size={48} round />
      </LinkedinShareButton>
      <RedditShareButton url={url} className={styles.icon}>
        <RedditIcon size={48} round />
      </RedditShareButton>
      <EmailShareButton url={url} className={styles.icon}>
        <EmailIcon size={48} round />
      </EmailShareButton>
    </div>
  );
};

ShareBar.propTypes = {
  url: PropTypes.string.isRequired,
  className: PropTypes.string
};

ShareBar.defaultProps = {
  className: ""
};

export default ShareBar;
