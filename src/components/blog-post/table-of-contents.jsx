import { Link } from "gatsby";
import React from "react";
import styles from "../../../css/table-of-contents.module.scss";
function createItems(items, slug, depth) {
  return (
    items &&
    items.map((item, index) => (
      <li key={slug + (item.url || depth + `-` + index)}>
        {item.url && <Link to={slug + item.url}>{item.title}</Link>}
        <ul>{createItems(item.items, slug, depth + 1)}</ul>
      </li>
    ))
  );
}

function TableOfContents({ page }) {
  return (
    <nav className={styles.nav}>
      <h2 className={styles.heading}>Table of Contents</h2>
      <ul>{createItems(page.tableOfContents.items, page.fields.slug, 1)}</ul>
    </nav>
  );
}

export default TableOfContents;
