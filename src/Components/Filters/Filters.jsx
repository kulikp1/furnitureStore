import React from "react";
import styles from "./Filters.module.css";

export default function Filters({ currentCategory }) {
  const filterLabels = ["Ціна"];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        Home page &nbsp;•&nbsp; {currentCategory}
      </div>
      <h2 className={styles.title}>{currentCategory}</h2>

      <div className={styles.filters}>
        {filterLabels.map((label) => (
          <button key={label} className={styles.filterBtn}>
            {label} ▾
          </button>
        ))}
      </div>
    </div>
  );
}
