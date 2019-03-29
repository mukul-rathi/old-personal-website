import Card from "../components/card";
import React from 'react'


function formatDate(date){
    let dateFormat = require('dateformat');
    return dateFormat(date, "dS mmmm yyyy");
    
}

function blogProps(props){
    var {fields, frontmatter, className} = props;
    
    return ({
        'title': frontmatter.title,
        'img': {
            'fluid': (frontmatter.image) ? (frontmatter.image.childImageSharp) ? frontmatter.image.childImageSharp.fluid : null : null,
        },
        'date': formatDate(frontmatter.date),
        'category':frontmatter.series,
        'link1':{
            'href': fields.slug,
            'text' : "Read More"
        },
        'description': frontmatter.excerpt,
        'className' : className
    });
}

const BlogCard = (props) => (
        <Card {...blogProps(props)} key={props.frontmatter.title}/>
);

export default BlogCard;