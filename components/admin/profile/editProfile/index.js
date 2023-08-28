"use client";

import styles from "./editProfile.module.css";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { Context } from "@/context/Context";
import { useEffect } from "react";
import AdminAbout from "../../adminAbout";

export default function EditProfileForm() {
  const router = useRouter();
  const { profile, fetchProfile } = useContext(Context);
  const [applied, setApplied] = useState(0);

  const [info, setInfo] = useState({
    name: "felix ramallo",
    job: profile?.job,
    description: profile?.description,
  });
  useEffect(() => {
    if (!profile.job) {
      fetchProfile();
    }
  }, []);
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!info.job || !info.description) {
      alert("All Fields Required");
      return;
    }
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "content-type": "application.json" },
        body: JSON.stringify(info),
      });
      if (!res.ok) {
        throw new Error("Failed to update Profile");
      }
      fetchProfile();
      setApplied("ok");
      setTimeout(() => {
        setApplied(0);
      }, 3000);
      router.refresh();
    } catch (error) {
      console.log(error);
      setApplied("error");
      setTimeout(() => {
        setApplied(0);
      }, 3000);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <div className={styles.label}>Nombre:</div>
          <input value="Felix Ramallo" type="text" disabled />
        </div>
        <div className={styles.group}>
          <div className={styles.label}>Trabajo:</div>
          <input
            name="job"
            value={info.job}
            onChange={handleChange}
            className=""
            type="text"
            placeholder="Job Description"
          />
        </div>
        <div className={styles.group}>
          <div className={styles.label}>Descripción:</div>
          <textarea
            name="description"
            rows={10}
            value={info.description}
            onChange={handleChange}
            className=""
            type="text"
            placeholder="Description"
          />
        </div>
        <div className={styles.status}>
          {applied === "ok" ? (
            <div className={styles.applied}>Profile Actualizado</div>
          ) : applied === "error" ? (
            <div className={styles.error}>
              Hubo un error, intentá nuevamente
            </div>
          ) : null}
        </div>
        <button type="submit" className={styles.apply}>
          Aplicar Cambios
        </button>
      </form>
      <div className={styles.about}>
        <AdminAbout profile={info} />
      </div>
    </div>
  );
}
