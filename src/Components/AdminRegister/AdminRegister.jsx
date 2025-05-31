import React, { useState, useEffect } from "react";
import styles from "./AdminRegister.module.css";

export default function AdminRegister() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    passwordMatch: "",
  });

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Email validation
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Некоректна електронна адреса",
      }));
    }

    // Password match validation
    if (name === "password" || name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        passwordMatch:
          updatedForm.password === updatedForm.confirmPassword
            ? ""
            : "Паролі не співпадають",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.email && !errors.passwordMatch) {
      console.log("Реєстрація успішна:", form);
      // Запит до API
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <h2>Реєстрація адміністратора</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Електронна пошта</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>

          <div className={styles.field}>
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Повторіть пароль</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.passwordMatch && (
              <div className={styles.error}>{errors.passwordMatch}</div>
            )}
          </div>

          <button type="submit">Зареєструватися</button>
        </form>
      </div>
    </div>
  );
}
