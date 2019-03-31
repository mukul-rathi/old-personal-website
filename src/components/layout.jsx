import React from "react";
import PropTypes from "prop-types";
import NavBar from "./nav-bar";
import Footer from "./footer";
import styles from "../../css/layout.module.scss";

const Layout = props => {
  const { page, children } = props;
  return (
    <div className={styles.layout}>
      <NavBar page={page} />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  page: PropTypes.string.isRequired,
  children: PropTypes.element
};

Layout.defaultProps = {
  children: null
};

export default Layout;
