import React from "react";
import dateFormat from "dateformat";
import Card from "../card/card";

function formatDate(date) {
  return dateFormat(date, "dS mmmm yyyy");
}

function blogProps(props) {
  const { fields, frontmatter, className } = props;

  return {
    title: frontmatter.title,
    img: {
      fluid: frontmatter.image.childImageSharp.fluid
    },
    date: formatDate(frontmatter.datePublished),
    category: frontmatter.series,
    link1: {
      href: fields.slug,
      text: "Read More"
    },
    description: frontmatter.excerpt,
    className
  };
}

const BlogCard = props => {
  const {
    frontmatter: { title }
  } = props;
  return <Card {...blogProps(props)} key={title} />;
};

export default BlogCard;
