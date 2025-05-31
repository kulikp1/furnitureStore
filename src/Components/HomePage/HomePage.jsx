import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://683aed4f43bb370a86742d36.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const ProductCard = ({ category, title, price, image }) => {
    return (
      <div className={styles.card}>
        <div className={styles.category}>{category}</div>

        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </div>

        <div className={styles.footer}>
          <span>
            <strong>{title}</strong>
          </span>
          <span>{price}₴</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Товари</h1>
      <div className={styles.cardGrid}>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            category={item.category}
            title={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
