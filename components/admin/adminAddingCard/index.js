"use client";
import Link from "next/link";
import styles from "./adminAddingCard.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminProjectCard from "@/components/admin/adminProjectCard";

export default function AdminAddingCard() {
  const router = useRouter();
  const [project, setProject] = useState({
    title: "",
    description: "",
    company: "",
    image: "",
    url: "",
    priorityNumber: "",
  });
  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(project);
    if (
      !project.title ||
      !project.description ||
      !project.image ||
      !project.url ||
      !project.priorityNumber ||
      !project.company
    ) {
      alert("All Fields are Required");
      return;
    }
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-type": "aplication/json",
        },
        body: JSON.stringify({
          title: project.title,
          description: project.description,
          company: project.company,
          image: project.image,
          url: project.url,
          priorityNumber: project.priorityNumber,
        }),
      });
      if (res.ok) {
        router.refresh();
        // router.push("/");
      } else {
        throw new Error("Failed to create the topic");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Link href="/admin" className={styles.goBack}>
          <button>Go Back to Admin Dashboard</button>
        </Link>
        <button className="">Add Another Project</button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.formTitle}>Add Project</h3>
        <input
          name="title"
          value={project.title}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Project Title"
        />
        <textarea
          name="description"
          rows={4}
          value={project.description}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Project Description"
        />
        <input
          name="company"
          value={project.company}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Company/Media"
        />
        <input
          name="image"
          value={project.image}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Image URL"
        />
        <input
          name="url"
          value={project.url}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Project URL"
        />
        <input
          name="priorityNumber"
          value={project.priorityNumber}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Priority Order"
        />
        <button type="submit" className="">
          Add Project
        </button>
      </form>

      <AdminProjectCard project={project} />
    </div>
  );
}
