import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Стільці");
  const [sortOrder, setSortOrder] = useState(null); // 'asc' | 'desc' | null
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://683aed4f43bb370a86742d36.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const toggleSortOrder = () => {
    setSortOrder((prev) => {
      if (prev === "asc") return "desc";
      if (prev === "desc") return "asc";
      return "asc"; // починаємо з "asc"
    });
  };

  const filteredProducts = products
    .filter((item) => item.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const ProductCard = ({ id, category, title, price, image }) => {
    const handleAdd = () => {
      addToCart({ id, category, title, price, image });
    };

    return (
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
          <button className={styles.btn} onClick={handleAdd}>
            Додати в кошик
          </button>
          <button
            className={styles.btnOutline}
            onClick={() => navigate(`/product/${id}`)}
          >
            Деталі
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Filters
        currentCategory={selectedCategory}
        sortOrder={sortOrder}
        onToggleSort={toggleSortOrder}
      />
      <div className={styles.cardGrid}>
        {filteredProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
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
