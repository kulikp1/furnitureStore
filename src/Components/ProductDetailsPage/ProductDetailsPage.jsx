import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductDetailsPage.module.css";
import Header from "../Header/Header";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://683aed4f43bb370a86742d36.mockapi.io/items/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <div className={styles.loading}>Завантаження...</div>;

  return (
    <div className={styles.page}>
      <Header selectedCategory={product.category} />
      <div className={styles.container}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <div className={styles.details}>
          <h2 className={styles.title}>{product.name}</h2>
          <p className={styles.category}>Категорія: {product.category}</p>
          <p className={styles.price}>Вартість: {product.price}₴</p>
          <p className={styles.description}>
            {product.description || "Опис товару відсутній."}
          </p>
          <div className={styles.buttons}>
            <button className={styles.addToCart}>Додати в кошик</button>
            <button className={styles.back} onClick={() => navigate(-1)}>
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
