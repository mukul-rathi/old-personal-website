import Card from "../components/card";
import React from 'react'


function formatDate(date){
    let dateFormat = require('dateformat');
    return dateFormat(date, "dS mmmm yyyy");
    
}

function blogProps(node){
    var {fields, frontmatter} = node;
    return ({
        'title': frontmatter.title,
        'img': {
            'src': frontmatter.img,
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
        'description': frontmatter.excerpt
    });
}

const BlogCard = (props) => {
    return(
        <Card {...blogProps(props)} key={props.frontmatter.title}/>
    );
}

export default BlogCard;