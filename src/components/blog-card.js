import Card from "../components/card";

function formatPath(absolutePath){
    //input = /Users/...../..../yyyy-mm-dd-title.md
    var splitPath = absolutePath.split("/");
    var path = splitPath[splitPath.length-1].split(".")[0]
    //path = yyyy-mm-dd-title
    return path.replace(/-/g,"/");

}

function formatDate(date){
    let dateFormat = require('dateformat');
    return dateFormat(date, "dS mmmm yyyy");
    
}

function blogProps(node){
    var {fileAbsolutePath, frontmatter} = node;
    return ({
        'title': frontmatter.title,
        'img': {
            'src': frontmatter.img,
            'alt': frontmatter.caption
        },
        'date': formatDate(frontmatter.date),
        'category':frontmatter.series,
        'link1':{
            'href': formatPath(fileAbsolutePath),
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
        Card(blogProps(props))
    );
}

export default BlogCard;