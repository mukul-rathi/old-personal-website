import React from "react"
import { Link } from "gatsby";
import styles from '../../css/nav-bar.module.css'
import classNames from 'classnames'


class NavBar extends React.Component{
    constructor(props){
        super(props);
        //bind value of this in function
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            prevYOffSet: 0,
            hidden:false
        };
    }
    handleScroll(){
        let currentYOffSet = window.pageYOffset;

        if(currentYOffSet<=this.state.prevYOffSet){
            this.setState({hidden:false});
        }
        else{
            if(currentYOffSet>100){
            this.setState({hidden:true});
            }
        }
        this.setState({prevYOffSet: currentYOffSet});
    }

    //Lifecycle methods
    componentDidMount(){
        document.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount(){
        document.removeEventListener('scroll', this.handleScroll);
    }


    navButtons = {
        "Home" : "/",
        "About Me" : "/about-me",
        "Blog" : "/blog"
    };
   render(){
        return (
            <nav className={classNames(styles.navBar,(this.state.hidden)? styles.hiddenNavBar : null)} > 
                {
                Object.entries(this.navButtons).map(
                ([key, value]) =>  (<Link 
                    className= {classNames(styles.navButton, (this.props.page===key)? styles.selectedNavButton : null)}
                    to={value} key={key}> {key}</Link>)
                )
                }
            </nav>
        );
        }

}

export default NavBar;