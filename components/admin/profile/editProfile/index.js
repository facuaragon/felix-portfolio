"use client";

import styles from "./editProfile.module.css";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { Context } from "@/context/Context";

export default function EditProfileForm({ profile }) {
  const router = useRouter();
  const { fetchProfile } = useContext(Context);
  const [info, setInfo] = useState({
    job: profile?.job,
    description: profile?.description,
  });
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
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <div className={styles.label}>Name:</div>
          <input value="Felix Ramallo" type="text" disabled />
        </div>
        <div className={styles.group}>
          <div className={styles.label}>Job:</div>
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
          <div className={styles.label}>Description:</div>
          <textarea
            name="description"
            rows={5}
            value={info.description}
            onChange={handleChange}
            className=""
            type="text"
            placeholder="Description"
          />
        </div>
        <button type="submit" className={styles.apply}>
          Apply Changes
        </button>
      </form>
    </>
  );
}
