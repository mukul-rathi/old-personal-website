import React from "react";

const BlogDescription = props => {
  const { className } = props;
  return (
    <section className={className}>
      <p>
        Welcome to my blog! This is a place where I write about what {"I've "}
        been learning. In some sense, the posts both help consolidate the
        learning and also serve as a reference for future. I hope that you find
        the posts I share useful!
      </p>
      <p>
        This blog is also a sandbox where {"I'm "} learning to communicate
        technical ideas clearly. Learning is a continual process, and{" "}
        <strong>feedback is a gift</strong>! Please reach out on Twitter if you
        have feedback.
      </p>
    </section>
  );
};

export default BlogDescription;
