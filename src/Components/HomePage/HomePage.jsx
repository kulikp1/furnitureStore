import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Стільці");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://683aed4f43bb370a86742d36.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filteredProducts = products.filter(
    (item) => item.category === selectedCategory
  );

  const ProductCard = ({ id, category, title, price, image }) => (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <span className={styles.category}>{category}</span>

      <div className={styles.footer}>
        <span className={styles.title}>
          <strong>{title}</strong>
        </span>
        <span className={styles.price}>{price}₴</span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.btn}>Додати в кошик</button>
        <button
          className={styles.btnOutline}
          onClick={() => navigate(`/product/${id}`)}
        >
          Деталі
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Filters currentCategory={selectedCategory} />
      <div className={styles.cardGrid}>
        {filteredProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id} // ← передаємо id сюди
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
