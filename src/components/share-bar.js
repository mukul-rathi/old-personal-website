import React from 'react'
import styles from '../../css/share-bar.module.scss'
import classNames from 'classnames'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
  } from 'react-share';
  import {
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
    RedditIcon,
    EmailIcon,
  } from 'react-share';
const ShareBar = (props) =>(
  <div className={classNames(styles.shareBar, props.className)}>
    <FacebookShareButton url={props.url} className={styles.icon}>
      <FacebookIcon size={48} round={true}  />
    </FacebookShareButton>
    <TwitterShareButton url={props.url} className={styles.icon}>
      <TwitterIcon size={48} round={true} />
    </TwitterShareButton>
    <WhatsappShareButton url={props.url} className={styles.icon}>
      <WhatsappIcon size={48} round={true} />
    </WhatsappShareButton>
    <LinkedinShareButton url={props.url} className={styles.icon}>
      <LinkedinIcon size={48} round={true} />
    </LinkedinShareButton>
    <RedditShareButton url={props.url} className={styles.icon}>
      <RedditIcon size={48} round={true} />
    </RedditShareButton>
    <EmailShareButton url={props.url} className={styles.icon}>
      <EmailIcon size={48} round={true} />
    </EmailShareButton>
  </div>
);

export default ShareBar;