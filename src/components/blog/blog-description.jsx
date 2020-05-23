import React from "react";

const BlogDescription = (props) => {
  const { className } = props;
  return (
    <section className={className}>
      <p>
        Welcome to my blog! I've moved sites now - go to my{" "}
        <a href="https://mukulrathi.netlify.app/blog">new site</a> instead!{" "}
      </p>
    </section>
  );
};

export default BlogDescription;
