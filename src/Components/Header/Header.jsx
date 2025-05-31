import React from "react";
import styles from "./Header.module.css";
import { ShoppingBag } from "lucide-react";

export default function Header({ selectedCategory, onSelectCategory }) {
  const categories = ["Стільці", "Крісла", "Дивани", "Контакти"];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>luxf</div>

      <nav className={styles.nav}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.navBtn} ${
              selectedCategory === cat ? styles.active : ""
            }`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className={styles.icons}>
        <ShoppingBag size={20} />
      </div>
    </header>
  );
}
