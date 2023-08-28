"use client";
import { useEffect, useState } from "react";
import styles from "./form.module.css";

export default function Form({ setModal }) {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("black");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {}, [errors]);

  const validations = (form) => {
    const errors = {};
    if (!form.name) {
      errors.name = "Requerido";
    } else {
      errors.name = "";
    }
    if (!form.email) {
      errors.email = "Requerido";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        form.email
      )
    ) {
      errors.email = "Formato Inválido";
    } else {
      errors.email = "";
    }
    if (!form.phone) {
      errors.phone = "Requerido";
    } else if (!/^[0-9]*$/.test(form.phone)) {
      errors.phone = "Solo Números";
    } else {
      errors.phone = "";
    }
    if (!form.message) {
      errors.message = "Requerido";
    } else {
      errors.message = "";
    }
    return errors;
  };
  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };

  const onSending = () => {
    setMessage("Enviando...");
  };
  const onSuccess = () => {
    setMessage("Mensaje Enviado");
    setColor("green");
  };
  const onError = () => {
    setMessage("Hubo un error, por favor intente nuevamente");
    setColor("red");
  };

  const closeMessage = () => {
    setMessage("");
    setColor("black");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validations(form);
    setErrors(error);
    if (
      error.name === "" &&
      error.email === "" &&
      error.phone === "" &&
      error.message === ""
    ) {
      try {
        onSending();
        const res = await fetch("api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        onSuccess();
        setTimeout(() => {
          closeMessage();
        }, 3000);
        setTimeout(() => {
          setModal(false);
        }, 2000);
      } catch (error) {
        console.log(error.message);
        onError();
        setTimeout(() => {
          closeMessage();
        }, 3000);
      }
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };
  return (
    <>
      <form className={styles.form}>
        <h3>Envíame un Mensaje</h3>
        <div className={styles.subGroup}>
          <label>
            Nombre Completo <span className={styles.required}>*</span>
          </label>
          <input name="name" value={form.name} onChange={handleChange} />
          <div className={styles.error}>{errors.name}</div>
        </div>
        <div className={styles.subGroup}>
          <label id="email">
            Correo Electrónico <span className={styles.required}>*</span>
          </label>
          <input name="email" value={form.email} onChange={handleChange} />
          <div className={styles.error}>{errors.email}</div>
        </div>
        <div className={styles.subGroup}>
          <label id="phone">
            Teléfono <span className={styles.required}>*</span>
          </label>
          <input name="phone" value={form.phone} onChange={handleChange} />
          <div className={styles.error}>{errors.phone}</div>
        </div>

        <div className={styles.subGroup}>
          <label id="message">
            Mensaje <span className={styles.required}>*</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
          />
          <div className={styles.error}>{errors.message}</div>
        </div>

        <p style={{ color: color }}>{message ? message : "\u00A0"}</p>

        <div className={styles.button} onClick={handleSubmit}>
          Enviar
        </div>
      </form>
    </>
  );
}
