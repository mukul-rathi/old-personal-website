import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import classNames from "classnames";
import styles from "../../../css/nav-bar.module.scss";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    // bind value of this in function
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      prevYOffSet: 0,
      hidden: false
    };
    this.navButtons = {
      Home: "/",
      "About Me": "/about-me",
      Blog: "/blog"
    };
  }

  // Lifecycle methods
  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const currentYOffSet = window.pageYOffset;
    const { prevYOffSet } = this.state;
    if (currentYOffSet <= prevYOffSet) {
      this.setState({ hidden: false });
    } else if (currentYOffSet > 100) {
      this.setState({ hidden: true });
    }
    this.setState({ prevYOffSet: currentYOffSet });
  }

  render() {
    const { page } = this.props;
    const { hidden } = this.state;
    return (
      <nav
        className={classNames(
          styles.navBar,
          hidden ? styles.hiddenNavBar : null
        )}
      >
        {Object.entries(this.navButtons).map(([key, value]) => (
          <Link
            className={classNames(
              styles.navButton,
              page === key ? styles.selectedNavButton : null
            )}
            to={value}
            key={key}
          >
            {" "}
            {key}
          </Link>
        ))}
      </nav>
    );
  }
}

NavBar.propTypes = {
  page: PropTypes.string.isRequired
};

export default NavBar;
