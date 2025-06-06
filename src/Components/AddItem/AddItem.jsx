import React, { useState } from "react";
import styles from "./AddItem.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddItem = () => {
  const [item, setItem] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setItem({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_mebel");
    formData.append("cloud_name", "dwzh7gxwq");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwzh7gxwq/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setItem((prev) => ({
          ...prev,
          image: data.secure_url,
        }));
        toast.success("✅ Зображення завантажено успішно!");
      } else {
        throw new Error("Не вдалося отримати URL зображення");
      }
    } catch (err) {
      console.error("Помилка при завантаженні зображення:", err);
      toast.error("❌ Не вдалося завантажити зображення.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item.image) {
      toast.warn("⚠️ Будь ласка, завантажте зображення перед збереженням.");
      return;
    }

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
      toast.success("Товар додано успішно!");
      console.log("Збережено:", data);
      resetForm();
    } catch (error) {
      toast.error("Помилка при збереженні.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className={styles.card}>
        <div className={styles.categoryBadge}>{item.category}</div>
        <div className={styles.imageWrapper}>
          {item.image ? (
            <img src={item.image} alt={item.name} className={styles.image} />
          ) : (
            <div className={styles.imagePlaceholder}>Немає зображення</div>
          )}
        </div>
        <div className={styles.bottomCard}>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.price}>{item.price}₴</div>
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
          Опис
          <textarea
            className={styles.input}
            name="description"
            value={item.description}
            onChange={handleChange}
            rows={4}
            placeholder="Опишіть товар..."
            required
            style={{ resize: "none" }}
          />
        </label>

        <label className={styles.label}>
          Завантажити зображення
          <input
            type="file"
            accept="image/*"
            className={styles.input}
            onChange={handleImageUpload}
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
