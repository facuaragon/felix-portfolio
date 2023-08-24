"use client";
import Link from "next/link";
import styles from "./adminProjectForm.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminProjectForm({ project }) {
  const router = useRouter();
  const [info, setInfo] = useState({
    id: project._id,
    priorityNumber: project.priorityNumber,
    title: project.title,
    company: project.company,
    description: project.description,
    image: project.image,
    url: project.url,
  });
  const handleChange = (e) => {
    setInfo({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(project);
    if (
      !info.title ||
      !info.description ||
      !info.image ||
      !info.url ||
      !info.priorityNumber ||
      !info.company
    ) {
      alert("All Fields are Required");
      return;
    }
    // try {
    //   const res = await fetch("/api/projects", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "aplication/json",
    //     },
    //     body: JSON.stringify({
    //       title: project.title,
    //       description: project.description,
    //       company: project.company,
    //       image: project.image,
    //       url: project.url,
    //       priorityNumber: project.priorityNumber,
    //     }),
    //   });
    //   if (res.ok) {
    //     router.push("/");
    //   } else {
    //     throw new Error("Failed to create the topic");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <div className={styles.label}>Title:</div>
          <input
            name="title"
            value={info.title}
            onChange={handleChange}
            className=""
            type="text"
            placeholder="Project Title"
          />
        </div>
        <div className={styles.group}>
          <div className={styles.label}>Description:</div>
          <textarea
            name="description"
            rows={4}
            value={info.description}
            onChange={handleChange}
            className=""
            type="text"
            placeholder="Project Description"
          />
        </div>
        <div className={styles.group}>
          <div className={styles.label}>Company:</div>
          <input
            name="company"
            value={info.company}
            onChange={handleChange}
            className=""
            type="text"
            placeholder="Company/Media"
          />
        </div>
        <div className={styles.group}>
          <div className={styles.label}>Image URL:</div>
          <input
            name="image"
            value={info.image}
            onChange={handleChange}
            className=""
            type="text"
            placeholder="Image URL"
          />
        </div>
        <div className={styles.group}>
          <div className={styles.label}>Project URL:</div>
          <input
            name="url"
            value={info.url}
            onChange={handleChange}
            className=""
            type="text"
            placeholder="Project URL"
          />
        </div>
        <div className={styles.group}>
          <div className={styles.label}>Priority Order:</div>
          <input
            name="priorityNumber"
            value={info.priorityNumber}
            onChange={handleChange}
            className=""
            type="text"
            placeholder="Priority Order"
          />
        </div>
        <button type="submit" className="">
          Apply Changes
        </button>
      </form>
    </div>
  );
}
