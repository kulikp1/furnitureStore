import React, { useState, useEffect } from "react";
import styles from "./AdminRegister.module.css";
import { Eye, EyeOff } from "lucide-react";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Некоректна електронна адреса",
      }));
    }

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

  const handleBlur = (e) => {
    const { name } = e.target;

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(form.email) ? "" : "Некоректна електронна адреса",
      }));
    }

    if (name === "password" || name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        passwordMatch:
          form.password === form.confirmPassword ? "" : "Паролі не співпадають",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errors.email && !errors.passwordMatch) {
      try {
        const response = await fetch(
          "https://683aed4f43bb370a86742d36.mockapi.io/admin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Помилка при реєстрації");
        }

        const data = await response.json();
        console.log("Реєстрація успішна:", data);
        alert("Реєстрація успішна!");
        // Очистити форму або переадресувати
        setForm({ email: "", password: "", confirmPassword: "" });
      } catch (error) {
        console.error("Помилка:", error);
        alert("Щось пішло не так. Спробуйте ще раз.");
      }
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
              onBlur={handleBlur}
              required
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>

          <div className={styles.field}>
            <label>Пароль</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.iconBtn}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label>Повторіть пароль</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className={styles.iconBtn}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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
