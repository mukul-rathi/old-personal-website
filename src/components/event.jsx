import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import styles from "../../css/event.module.scss";

const Event = props => {
  const { date, logo, location, role, points } = props;
  return (
    <section className={styles.event}>
      <div className={styles.metaData}>
        <h4 className={styles.date}>{date}</h4>
        <Img className={styles.img} fluid={logo} alt="event-logo" />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.headings}>
          <h3 className={styles.location}> {location} </h3>
          <h3 className={styles.role}> {role}</h3>
        </div>
        <div className={styles.description}>
          {Object.keys(points).map(title => (
            <p>
              {title && <strong>{title}: </strong>}
              {points[title]}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

Event.propTypes = {
  date: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  points: PropTypes.shape().isRequired
};

export default Event;
