import React from 'react'
import SocialButton from './social-button';
import LinkButton from './link-button';
import styles from '../../css/card.module.css'
import classNames from 'classnames'
import Img from 'gatsby-image'
import CardShareBar from './card-share-bar';

class Card  extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            isSharing: false
        };
    }

    handleClick(e) {
        if(this.props.socialButton.img === "share"){
            e.preventDefault();
            this.setState({isSharing : true});
            this.props.socialButton.img = "cancel";
        }
        else if(this.props.socialButton.img === "cancel"){
            e.preventDefault();
            this.setState({isSharing : false});
            this.props.socialButton.img = "share";

        }
    }
    
    
    
    render() {
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
    const {img, category,date, title, description, link1, link2,socialButton, className} = this.props;
    return(
    <div className={classNames(styles.card, className)}>
        <div className={styles.mainImageDiv}>
            { img && img.fluid && <Img fluid={img.fluid} className={styles.mainImage}/>}
            { img && img.src && <img src={img.src} alt={img.alt} className={styles.mainImage}/>}

        </div>
        <div className={styles.metaData}>
            <h4 className={styles.category}>{category}</h4>
            <h4 className={styles.date}>{date}</h4>
        </div>
        <h3 className={styles.title}>{title} </h3>
        <div className={styles.description}> {description}
        </div>
          <div className={styles.linkButtons}>
          {link1 &&  <LinkButton href={link1.href}>{link1.text}</LinkButton>}
            {link2 &&  <LinkButton href={link2.href}>{link2.text}</LinkButton>}
          </div>
          
          <div  className={styles.socialButtonDiv}>
        {socialButton && <SocialButton img={socialButton.img} href={socialButton.href} className={styles.socialButton} onClick={(e)=>this.handleClick(e)}/>}
         </div>
         {this.isSharing && <CardShareBar className={styles.cardShareBar} url={link1.href}/>}
     </div>
    );
    }
}

export default Card;