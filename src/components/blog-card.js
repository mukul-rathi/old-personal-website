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
            'fluid': frontmatter.image.childImageSharp.fluid,
            'src': frontmatter.image,
            'alt': frontmatter.caption
        },
        'date': formatDate(frontmatter.date),
        'category':frontmatter.series,
        'link1':{
            'href': fields.slug,
            'text' : "Read More"
        },
        'socialButton': {
            'img': "share"
        }, 
        'description': frontmatter.excerpt,
        'className' : className
    });
}

const BlogCard = (props) => {
    return(
        <Card {...blogProps(props)} key={props.frontmatter.title}/>
    );
}

export default BlogCard;