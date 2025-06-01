import React from "react";
import styles from "./Filters.module.css";

export default function Filters({ currentCategory, sortOrder, onToggleSort }) {
  const sortArrow =
    sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "↕";

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        Home page &nbsp;•&nbsp; {currentCategory}
      </div>
      <h2 className={styles.title}>{currentCategory}</h2>

      <div className={styles.filters}>
        <button className={styles.filterBtn} onClick={onToggleSort}>
          Ціна {sortArrow}
        </button>
      </div>
    </div>
  );
}
