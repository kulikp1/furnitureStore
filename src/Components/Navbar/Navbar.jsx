import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>NORDIHOME</div>
      <nav>
        <a href="#">Стільці</a>
        <a href="#">Крісла</a>
        <a href="#">Дивани</a>
        <a href="#">Контакти</a>
      </nav>
    </header>
  );
}
