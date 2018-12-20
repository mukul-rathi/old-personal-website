import React from 'react'
const BlogDescription = (props) =>{
    return(
    <div className={props.className}>
        <p>Welcome to my blog! This is a place where I write about deep learning and all things computer science!
        </p>
        <p>
            I appreciate any feedback on how to improve both the blog posts, and the projects themselves, as well as project extensions worth 
            pursuing further. 
        </p>
        <p>
            If you liked a particular analogy and want a more detailed explanation using that analogy, or equally if there is something you think can be improved - <strong>comment on the blog post</strong> - I will check out your feedback and update the post accordingly!
        </p>

    </div>
    );
}

export default BlogDescription;