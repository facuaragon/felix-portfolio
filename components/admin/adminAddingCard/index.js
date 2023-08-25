"use client";

import styles from "./adminAddingCard.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminProjectCard from "@/components/admin/adminProjectCard";

export default function AdminAddingCard() {
  const router = useRouter();
  const [addedOk, setAddedOk] = useState(0);
  const [addedErr, setAddedErr] = useState(0);
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
  const cleanState = () => {
    setProject({
      title: "",
      description: "",
      company: "",
      image: "",
      url: "",
      priorityNumber: "",
    });
    setAddedOk(0);
    setAddedErr(0);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setAddedOk(1);
      } else {
        throw new Error("Failed to create the topic");
      }
    } catch (error) {
      console.log(error);
      setAddedErr(1);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div
          className={styles.added}
          style={addedOk ? { display: "flex" } : { display: "none" }}
        >
          <h3 className={styles.title}>Project Added</h3>
          <button
            type="reset"
            className={styles.buttonAdd}
            onClick={cleanState}
          >
            Add Another Project
          </button>
        </div>
        <div
          className={styles.added}
          style={addedErr ? { display: "flex" } : { display: "none" }}
        >
          <h3 className={styles.titleErr}>There was an Error</h3>
          <button
            type="reset"
            className={styles.buttonAdd}
            onClick={cleanState}
          >
            Try Again
          </button>
        </div>
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
          rows={7}
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
