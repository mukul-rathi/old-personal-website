import { Link } from "gatsby";
import React from "react";
import styles from "../../../css/table-of-contents.module.scss";

function createPostItem(post, currentPost) {
  const postItemContent =
    "Part " + post.frontmatter.part + ": " + post.frontmatter.title;
  if (post.frontmatter.draft) {
    return <em>{postItemContent}</em>;
  }
  if (post.frontmatter.title == currentPost.frontmatter.title) {
    return <strong>{postItemContent}</strong>;
  }
  return <Link to={post.fields.slug}>{postItemContent}</Link>;
}

const PostSeries = ({ posts, currentPost }) => {
  if (posts.length <= 1) {
    return null;
  }
  return (
    <nav className={styles.nav}>
      <h2 className={styles.heading}>
        <strong>Series: </strong>
        {currentPost.frontmatter.series}
      </h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{createPostItem(post.node, currentPost)}</li>
        ))}
      </ul>
    </nav>
  );
};

export default PostSeries;
