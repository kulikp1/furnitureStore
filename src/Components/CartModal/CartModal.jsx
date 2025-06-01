// src/components/CartModal/CartModal.jsx
import React from "react";
import styles from "./CartModal.module.css";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

export default function CartModal({ onClose }) {
  const { cartItems, increaseQuantity, decreaseQuantity, clearCart } =
    useCart();

  const handleCreateOrder = () => {
    toast.success("Замовлення створено!");
    clearCart();
    onClose();
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Ваш кошик</h2>
        {cartItems.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <ul className={styles.itemList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.item}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <p className={styles.itemTitle}>{item.name || item.title}</p>
                  <p>Ціна: {item.price}₴</p>
                  <div className={styles.qtyRow}>
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className={styles.qtyBtn}
                    >
                      -
                    </button>
                    <span className={styles.qtyText}>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <div className={styles.total}>
            <strong>Разом: {total}₴</strong>
          </div>
        )}
        <div className={styles.footer}>
          <button className={styles.orderBtn} onClick={handleCreateOrder}>
            Створити замовлення
          </button>
          <button className={styles.closeBtn} onClick={onClose}>
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}
