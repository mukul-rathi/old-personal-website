import React from "react"
import Layout from "../components/layout";
import styles from "../../css/404.module.scss"

export default () => {
    return(
    <Layout>
        <div className={styles.content}>
        <h1>This is not the page you are looking for. </h1>
        <p>
            Check out the blog to find the right blog post?
        </p>
        </div>
    </Layout>
    );
}