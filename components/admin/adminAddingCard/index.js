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
          <h3 className={styles.title}>Proyecto Añadido</h3>
          <button
            type="reset"
            className={styles.buttonAdd}
            onClick={cleanState}
          >
            Añadir otro Poyecto
          </button>
        </div>
        <div
          className={styles.added}
          style={addedErr ? { display: "flex" } : { display: "none" }}
        >
          <h3 className={styles.titleErr}>Hubo un error</h3>
          <button
            type="reset"
            className={styles.buttonAdd}
            onClick={cleanState}
          >
            Intentá de nuevo
          </button>
        </div>
        <h3 className={styles.formTitle}>Añadir Proyecto</h3>
        <input
          name="title"
          value={project.title}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Título"
        />
        <textarea
          name="description"
          rows={7}
          value={project.description}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Descripción"
        />
        <input
          name="company"
          value={project.company}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Compañía"
        />
        <input
          name="image"
          value={project.image}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Link Imagen"
        />
        <input
          name="url"
          value={project.url}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Link Proyecto"
        />
        <input
          name="priorityNumber"
          value={project.priorityNumber}
          onChange={handleChange}
          className=""
          type="text"
          placeholder="Orden de prioridad"
        />
        <button type="submit" className="">
          Añadir Proyecto
        </button>
      </form>

      <AdminProjectCard project={project} />
    </div>
  );
}
