/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./AdminRegister.module.css";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function AdminRegister() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  const validate = (form) => {
    const newErrors = {};

    if (!form.email) newErrors.email = "Введіть електронну пошту";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Некоректна електронна адреса";
    }

    if (!form.password) {
      newErrors.password = "Введіть пароль";
    } else if (form.password.length < 6) {
      newErrors.password = "Пароль має містити щонайменше 6 символів";
    }

    if (isRegister) {
      if (!form.confirmPassword) {
        newErrors.passwordMatch = "Підтвердіть пароль";
      } else if (form.password !== form.confirmPassword) {
        newErrors.passwordMatch = "Паролі не співпадають";
      }
    }

    return newErrors;
  };

  useEffect(() => {
    setErrors(validate(form));
  }, [form, isRegister]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate(form);
    setErrors(formErrors);
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(formErrors).length > 0) {
      toast.error("Будь ласка, виправте помилки перед відправкою.");
      return;
    }

    if (isRegister) {
      try {
        const res = await fetch(
          `https://683aed4f43bb370a86742d36.mockapi.io/admin`
        );
        const existing = await res.json();

        if (
          existing.some(
            (u) => u.email.toLowerCase() === form.email.toLowerCase()
          )
        ) {
          toast.error("Ця пошта вже зареєстрована.");
          return;
        }

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
        setTouched({});
        setIsRegister(false);
      } catch {
        toast.error("Помилка при реєстрації. Спробуйте ще раз.");
      }
    } else {
      try {
        const res = await fetch(
          `https://683aed4f43bb370a86742d36.mockapi.io/admin`
        );
        const users = await res.json();

        const matched = users.find(
          (u) =>
            u.email.toLowerCase() === form.email.toLowerCase() &&
            u.password === form.password
        );

        if (matched) {
          toast.success("Успішний вхід!");
          navigate("/addItem");
        } else {
          toast.error("Невірна пошта або пароль.");
        }
      } catch {
        toast.error("Помилка при вході. Спробуйте ще раз.");
      }
    }
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
              onFocus={handleFocus}
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
                onFocus={handleFocus}
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
                  onFocus={handleFocus}
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
            onClick={() => {
              setIsRegister(!isRegister);
              setTouched({});
              setErrors({});
            }}
          >
            {isRegister
              ? "Вже маєте акаунт? Увійти"
              : "Не маєте акаунта? Зареєструватися"}
          </button>
        </form>
      </div>
    </div>
  );
}
