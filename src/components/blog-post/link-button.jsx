import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styles from "../../../css/link-button.module.scss";

const LinkButton = props => {
  const { href, children } = props;
  if (href && !href.includes("http")) {
    // internal link to website so client-side routing
    return (
      <Link to={href} className={styles.linkButton}>
        {children}{" "}
      </Link>
    );
  }
  return (
    <a href={href} className={styles.linkButton}>
      {children}{" "}
    </a>
  );
};

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string
};

LinkButton.defaultProps = {
  children: ""
};

export default LinkButton;
