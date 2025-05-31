import React from "react";
import styles from "./HomePage.module.css";
import NavBar from "../Navbar/Navbar";

const products = [
  { name: "AXF", price: "1000,00₴", img: "https://via.placeholder.com/150" },
  { name: "TICK", price: "1000,00₴", img: "https://via.placeholder.com/150" },
  { name: "MELM", price: "1000,00₴", img: "https://via.placeholder.com/150" },
  { name: "STR", price: "1000,00₴", img: "https://via.placeholder.com/150" },
  { name: "LAN", price: "1000,00₴", img: "https://via.placeholder.com/150" },
  { name: "YDV", price: "1000,00₴", img: "https://via.placeholder.com/150" },
  { name: "TERA", price: "1000,00₴", img: "https://via.placeholder.com/150" },
  { name: "YUN", price: "1000,00₴", img: "https://via.placeholder.com/150" },
  { name: "TAV", price: "1000,00₴", img: "https://via.placeholder.com/150" },
];

export default function HomePage() {
  return (
    <>
      <NavBar />
      <h1 className={styles.title}>Стільці</h1>

      <div className={styles.grid}>
        {products.map((product, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.tag}>СТІЛЕЦЬ</div>
            <img src={product.img} alt={product.name} />
            <div className={styles.info}>
              <span>{product.name}</span>
              <span>{product.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span className={styles.active}>4</span>
        <span>5</span>
        <span>→</span>
      </div>
    </>
  );
}
