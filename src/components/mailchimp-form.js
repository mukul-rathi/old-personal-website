import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import styles from '../../css/mailchimp-form.module.scss'

class MailChimpForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {'firstName': '', lastName: '', email: '', result: 'await'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = e => {
    this.setState({
      [`${e.target.name}`]: e.target.value,
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    addToMailchimp(this.state.email, {'FNAME': this.state.firstName, 'LNAME': this.state.lastName, 'EMAIL': this.state.email})
      .then(({ msg, result }) => {

        if (result !== 'success') {
          throw msg;
        }
        else{
          this.setState({result:"success" ,firstName: '', lastName: '', email: ''});
        }
      })
      .catch(err => {
        this.setState({result:"failure"});
      });
  }

  render () {
    const response = {
      'await': "Please fill out your details",
      'success': "Signed up successfully (check email to confirm).",
      'failure' : "Something went wrong, check if details are entered correctly."
    };
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}> Sign up for more tutorials! </h2>
            <p>
              I write tutorials distilling the key concepts from the technologies I have used, whether it be through my time at Cambridge University, through various side projects or through internships at companies such as Facebook.  
            </p>
            <p>
              To be notified when I next put out a post, sign up below!
            </p>
            <form onSubmit={this.handleSubmit} className={styles.form}>
                <input type="text" onChange={this.handleChange} placeholder="First Name" name="firstName" className={styles.field}/>
                <input type="text" onChange={this.handleChange} placeholder="Last Name" name="lastName" className={styles.field}/>
                <input type="email" onChange={this.handleChange} placeholder="Email" name="email" className={styles.field}/>
                <input type="submit" className={styles.submitButton}/>
            </form>
            <p>
              {response[this.state.result]}
            </p>
        </div>
    )
  }
}


export default MailChimpForm;