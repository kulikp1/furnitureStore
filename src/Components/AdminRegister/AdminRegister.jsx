import React, { useState, useEffect } from "react";
import styles from "./AdminRegister.module.css";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminAuth() {
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
    email: "",
    password: "",
    passwordMatch: "",
  });

  const [emailExists, setEmailExists] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isRegister, setIsRegister] = useState(true);

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

  const checkEmailExists = async (email) => {
    try {
      const res = await fetch(
        `https://683aed4f43bb370a86742d36.mockapi.io/admin?email=${email}`
      );
      const data = await res.json();
      const exists = data.length > 0;
      setEmailExists(exists);
      setErrors((prev) => ({
        ...prev,
        email: isRegister
          ? exists
            ? "Ця електронна адреса вже зареєстрована"
            : ""
          : !exists
          ? "Ця пошта не зареєстрована"
          : "",
      }));
    } catch (err) {
      console.error("Помилка перевірки пошти:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    if (name === "email") {
      if (validateEmail(value)) {
        checkEmailExists(value);
      }
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

    if (hasErrors) {
      toast.error("Будь ласка, виправте помилки перед відправкою.");
      return;
    }

    if (isRegister) {
      if (emailExists) {
        toast.error("Ця електронна адреса вже зареєстрована.");
        return;
      }

      try {
        await fetch("https://683aed4f43bb370a86742d36.mockapi.io/admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        toast.success("Реєстрація успішна!");
        setForm({ email: "", password: "", confirmPassword: "" });
        setTouched({ email: false, password: false, confirmPassword: false });
      } catch {
        toast.error("Помилка реєстрації.");
      }
    } else {
      if (!emailExists) {
        toast.error("Ця пошта не зареєстрована.");
        return;
      }

      try {
        const res = await fetch(
          `https://683aed4f43bb370a86742d36.mockapi.io/admin?email=${form.email}`
        );
        const users = await res.json();
        const user = users.find((u) => u.password === form.password);

        if (user) {
          toast.success("Вхід успішний!");
          // Можна зберегти у localStorage: localStorage.setItem("admin", JSON.stringify(user));
        } else {
          toast.error("Невірний пароль.");
        }
      } catch {
        toast.error("Помилка входу.");
      }
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setErrors({
      email: "",
      password: "",
      passwordMatch: "",
    });
    setForm({ email: "", password: "", confirmPassword: "" });
    setTouched({ email: false, password: false, confirmPassword: false });
    setEmailExists(false);
  };

  return (
    <div className={styles.page}>
      <ToastContainer />
      <div className={styles.formContainer}>
        <div className={styles.heading}>
          {isRegister ? "Реєстрація адміністратора" : "Вхід адміністратора"}
        </div>

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
            {touched.email && errors.email && (
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

          {isRegister && (
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
          )}

          <button className={styles.submitBtn} type="submit">
            {isRegister ? "Зареєструватися" : "Увійти"}
          </button>

          <button
            type="button"
            className={styles.switchBtn}
            onClick={toggleMode}
          >
            {isRegister
              ? "Вже є акаунт? Увійти"
              : "Немає акаунту? Зареєструватися"}
          </button>
        </form>
      </div>
    </div>
  );
}
