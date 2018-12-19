import React from 'react'
import SocialButton from './social-button';
import LinkButton from './link-button';
import styles from '../../css/card.module.css'
import classNames from 'classnames'
import Img from 'gatsby-image'

const Card  = (props) => {
    //display social/link button only if defined
    
    /*var props = {
        'title': "",
        'img': {
            'src': "",
            'alt': ""
        },
        'date': "",
        'category': "",
        'link1':{
            'href': "",
            'text' : ""
        }, 
        'link2':{
            'href': "",
            'text' : ""
        },
        'socialButton': {
            'href': "",
            'img': ""
        }, 
        'description': ""
    };

*/
    return(
    <div className={classNames(styles.card, props.className)}>
        <div className={styles.mainImageDiv}>
            { props.img && props.img.fluid && <Img fluid={props.img.fluid} className={styles.mainImage}/>}
            { props.img && props.img.src && <img src={props.img.src} alt={props.img.src} className={styles.mainImage}/>}

        </div>
        <div className={styles.metaData}>
            <h4 className={styles.category}>{props.category}</h4>
            <h4 className={styles.date}>{props.date}</h4>
        </div>
        <h3 className={styles.title}>{props.title} </h3>
        <div className={styles.description}>        {props.description}
        </div>
          <div className={styles.linkButtons}>
          {props.link1 &&  <LinkButton href={props.link1.href}>{props.link1.text}</LinkButton>}
            { props.link2 &&  <LinkButton href={props.link2.href}>{props.link2.text}</LinkButton>}
          </div>
          <div  className={styles.socialButtonDiv}>
        { props.socialButton && <SocialButton img={props.socialButton.img} href={props.socialButton.href} className={styles.socialButton}/>}
         </div>
     </div>
    );
}

export default Card;