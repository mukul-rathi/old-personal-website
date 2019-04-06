import React from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";
import styles from "../../css/mailchimp-form.module.scss";

class MailChimpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "", result: "await" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [`${e.target.name}`]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, firstName, lastName } = this.state;
    addToMailchimp(email, {
      FNAME: firstName,
      LNAME: lastName,
      EMAIL: email
    })
      .then(({ msg, result }) => {
        if (result !== "success") {
          throw msg;
        } else {
          this.setState({
            result: "success",
            firstName: "",
            lastName: "",
            email: ""
          });
        }
      })
      .catch(() => {
        this.setState({ result: "failure" });
      });
  }

  render() {
    const response = {
      await: "To be notified when I next put out a post, sign up below!",
      success: "Signed up successfully (check email to confirm).",
      failure: "Something went wrong, check if details are entered correctly."
    };
    const { result } = this.state;
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.heading}> Sign up for more tutorials! </h2>
        <p>
          I write tutorials distilling the key concepts from the technologies I
          have used, whether it be through my time at Cambridge University,
          through various side projects or through internships at companies such
          as Facebook.
        </p>
        <p>{response[result]}</p>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <label htmlFor="firstName">
            {"First Name"}
            <input
              type="text"
              onChange={this.handleChange}
              name="firstName"
              id="firstName"
              className={styles.field}
            />
          </label>
          <label htmlFor="lastName">
            {"Last Name"}
            <input
              type="text"
              onChange={this.handleChange}
              name="lastName"
              id="lastName"
              className={styles.field}
            />
          </label>
          <label htmlFor="email">
            {"Email"}
            <input
              type="email"
              onChange={this.handleChange}
              name="email"
              id="email"
              className={styles.field}
            />
          </label>
          <input type="submit" className={styles.submitButton} />
        </form>
      </div>
    );
  }
}

export default MailChimpForm;
