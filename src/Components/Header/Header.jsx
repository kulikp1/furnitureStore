import React from "react";
import styles from "./Header.module.css";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Header({ selectedCategory, onSelectCategory }) {
  const categories = ["Стільці", "Крісла", "Дивани", "Контакти"];
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.length;

  const handleCategoryClick = (cat) => {
    if (cat === "Контакти") {
      navigate("/contacts");
    } else {
      if (onSelectCategory) onSelectCategory(cat);
      navigate("/");
    }
  };

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
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className={styles.icons}>
        <div className={styles.cartIcon}>
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className={styles.cartCount}>{cartCount}</span>
          )}
        </div>
      </div>
    </header>
  );
}
