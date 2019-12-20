import React from "react";
import Img from "gatsby-image";
import styles from "../../../css/event.module.scss";

const Event = props => {
  const { date, logo, location, role, points } = props;
  return (
    <section className={styles.event}>
      <div className={styles.date}>
        <h3>{date}</h3>
      </div>

      <div className={styles.img}>
        <Img fluid={logo} alt="event-logo" />
      </div>
      <div className={styles.location}>
        <h3> {location} </h3>
      </div>
      <div className={styles.role}>
        <h3> {role}</h3>
      </div>
      <div className={styles.description}>
        {Object.keys(points).map(title => (
          <p>
            {title && <strong>{title}: </strong>}
            {points[title]}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Event;
