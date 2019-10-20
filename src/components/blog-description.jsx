import React from "react";
import PropTypes from "prop-types";

const BlogDescription = props => {
  const { className } = props;
  return (
    <section className={className}>
      <p>
        Welcome to my blog! This is a place where I write about what I've been
        learning. In some sense, the posts both help consolidate the learning
        and also serve as a reference for future. I hope that you find the posts
        I share useful!
      </p>
      <p>
        This blog is also a sandbox where I'm learning to communicate technical
        ideas clearly. Learning is a continual process, and{" "}
        <strong>feedback is a gift</strong>! Please comment on the post or reach
        out on Twitter if you have feedback.
      </p>
    </section>
  );
};

BlogDescription.propTypes = {
  className: PropTypes.string
};

BlogDescription.defaultProps = {
  className: ""
};

export default BlogDescription;
