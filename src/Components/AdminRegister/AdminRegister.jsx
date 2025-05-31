import React, { useState, useEffect } from "react";
import styles from "./AdminRegister.module.css";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminRegister() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    email: "Введіть електронну пошту",
    password: "Пароль має містити щонайменше 6 символів",
    passwordMatch: "Паролі мають співпадати",
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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

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

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Пароль має містити щонайменше 6 символів",
        passwordMatch:
          updatedForm.confirmPassword === value ? "" : "Паролі не співпадають",
      }));
    }

    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        passwordMatch:
          updatedForm.password === value ? "" : "Паролі не співпадають",
      }));
    }
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      try {
        await fetch("https://683aed4f43bb370a86742d36.mockapi.io/admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        toast.success("Адміністратора успішно зареєстровано!");

        setForm({ email: "", password: "", confirmPassword: "" });
        setTouched({ email: false, password: false, confirmPassword: false });
        setErrors({
          email: "Введіть електронну пошту",
          password: "Пароль має містити щонайменше 6 символів",
          passwordMatch: "Паролі мають співпадати",
        });
      } catch {
        toast.error("Помилка при реєстрації. Спробуйте ще раз.");
      }
    } else {
      toast.error("Будь ласка, виправте помилки перед відправкою.");
    }
  };

  return (
    <div className={styles.page}>
      <ToastContainer />
      <div className={styles.formContainer}>
        <div className={styles.heading}>Реєстрація адміністратора</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <div className={styles.label}>Електронна пошта</div>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.email && form.email !== "" && errors.email && (
              <div className={styles.error}>{errors.email}</div>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Пароль</div>
            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
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
            {touched.password && errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Підтвердження пароля</div>
            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
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
            {touched.confirmPassword && errors.passwordMatch && (
              <div className={styles.error}>{errors.passwordMatch}</div>
            )}
          </div>

          <button className={styles.submitBtn} type="submit">
            Зареєструватися
          </button>
        </form>
      </div>
    </div>
  );
}
