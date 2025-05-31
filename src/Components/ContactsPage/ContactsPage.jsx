import React from "react";
import styles from "./ContactsPage.module.css"; // Використовуємо ті ж стилі
import Header from "../Header/Header";

export default function ContactsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <h2 className={styles.heading}>Контакти</h2>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h3 className={styles.title}>Наша адреса</h3>
          <p>вул. Хрещатик, 22, Київ, Україна</p>

          <h3 className={styles.title}>Телефон</h3>
          <p>+380 (67) 123 45 67</p>

          <h3 className={styles.title}>Email</h3>
          <p>info@example.com</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.title}>Зворотній зв’язок</h3>
          <form className={styles.form}>
            <input
              type="text"
              placeholder="Ваше ім’я"
              className={styles.input}
            />
            <input type="email" placeholder="Email" className={styles.input} />
            <textarea
              placeholder="Ваше повідомлення"
              className={styles.textarea}
            />
            <button type="submit" className={styles.btn}>
              Надіслати
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
