import React, { useState } from "react";
import styles from "./AddItem.module.css";

const AddItem = () => {
  const [item, setItem] = useState({
    name: "AXF",
    price: "1000,00₴",
    category: "Chairs",
    image: "https://i.ibb.co/1Q9Z1PM/chair.png",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://683aed4f43bb370a86742d36.mockapi.io/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (!response.ok) {
        throw new Error("Не вдалося зберегти товар.");
      }

      const data = await response.json();
      alert("Товар додано успішно!");
      console.log("Збережено:", data);
    } catch (error) {
      alert("Помилка при збереженні.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.categoryBadge}>{item.category}</div>
        <div className={styles.imageWrapper}>
          <img src={item.image} alt={item.name} className={styles.image} />
        </div>
        <div className={styles.bottomCard}>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.price}>{item.price}</div>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Додати товар</h2>

        <label className={styles.label}>
          Назва
          <input
            className={styles.input}
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Ціна
          <input
            className={styles.input}
            name="price"
            value={item.price}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Категорія
          <input
            className={styles.input}
            name="category"
            value={item.category}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Зображення (URL)
          <input
            className={styles.input}
            name="image"
            value={item.image}
            onChange={handleChange}
            required
          />
        </label>

        <button
          type="submit"
          className={styles.input}
          style={{ cursor: "pointer", background: "#222", color: "#fff" }}
        >
          Додати
        </button>
      </form>
    </div>
  );
};

export default AddItem;
