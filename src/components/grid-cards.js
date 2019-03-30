import React from "react";
import Card from "./card";
import styles from "../../css/grid-cards.module.scss";

const GridCards = props => (
  <div className={styles.cards}>
    {Object.values(props).map(cardProps => (
      <Card {...cardProps} key={cardProps.title} />
    ))}
  </div>
);

export default GridCards;
