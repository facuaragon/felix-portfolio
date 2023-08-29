"use client";

import styles from "./adminEditProjectCard.module.css";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/context/Context";

export default function AdminEditProjectCard({ project }) {
  const { fetchProjects } = useContext(Context);
  const [visible, setVisible] = useState(0);
  const [applied, setApplied] = useState(0);
  const router = useRouter();
  const [info, setInfo] = useState({
    priorityNumber: project.priorityNumber,
    title: project.title,
    company: project.company,
    description: project.description,
    image: project.image,
    url: project.url,
  });
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "PUT",
        headers: { "content-type": "application.json" },
        body: JSON.stringify(info),
      });
      if (!res.ok) {
        throw new Error("Failed to update Topic");
      }
      setApplied("ok");
      setTimeout(() => {
        setApplied(0);
      }, 3000);
      fetchProjects();
      router.refresh();
      // router.push("/");
    } catch (error) {
      console.error(error);
      setApplied("error");
      setTimeout(() => {
        setApplied(0);
      }, 3000);
    }
  };

  const showForm = () => {
    if (visible) setVisible(0);
    else setVisible(1);
  };

  const cancelEdition = () => {
    setInfo({
      id: project._id,
      priorityNumber: project.priorityNumber,
      title: project.title,
      company: project.company,
      description: project.description,
      image: project.image,
      url: project.url,
    });
  };

  const closeEdition = () => {
    setVisible(0);
  };

  const deleteProject = async () => {
    const confirmed = confirm("Are you sure in deleting this project?");
    if (confirmed) {
      const res = await fetch(`/api/projects?id=${project._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProjects();
        router.refresh();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.link2}
        onClick={showForm}
        style={
          visible
            ? {
                border: "4px solid #5ec4fa",
                backgroundImage: ` linear-gradient(to right, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0.4)), url("${info.image}")`,
              }
            : {
                backgroundImage: ` linear-gradient(to right, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0.4)), url("${info.image}")`,
              }
        }
      >
        <div className={styles.texto1}>
          <div className={styles.title}>{info.title}</div>
          <div className={styles.subtitle}>{info.company}</div>
          <div className={styles.description}>{info.description}</div>
          <a href={info.url} target="_blank" className={styles.acceso}>
            + ir al articulo
          </a>
        </div>
      </div>
      <div
        className={styles.showForm}
        style={visible ? { display: "block" } : { display: "none" }}
      >
        {/* FORM */}
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.closeButton} onClick={closeEdition}>
              X
            </div>
            <div className={styles.group}>
              <div className={styles.label}>Título:</div>
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
              <div className={styles.label}>Descripción:</div>
              <textarea
                name="description"
                rows={5}
                value={info.description}
                onChange={handleChange}
                className=""
                type="text"
                placeholder="Project Description"
              />
            </div>
            <div className={styles.group}>
              <div className={styles.label}>Compañía:</div>
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
              <div className={styles.label}>Link Imagen:</div>
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
              <div className={styles.label}>Link Proyecto:</div>
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
              <div className={styles.label}>Orden de Prioridad:</div>
              <input
                name="priorityNumber"
                value={info.priorityNumber}
                onChange={handleChange}
                className=""
                type="text"
                placeholder="Priority Order"
              />
            </div>
            <div className={styles.status}>
              {applied === "ok" ? (
                <div className={styles.applied}>Proyecto Actualizado</div>
              ) : applied === "error" ? (
                <div className={styles.error}>
                  Hubo un error, intentá de nuevo
                </div>
              ) : null}
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.apply}>
                Aplicar Cambios
              </button>
              <button
                type="reset"
                onClick={cancelEdition}
                className={styles.close}
              >
                Cancelar Edicion
              </button>
              <button
                type="reset"
                onClick={deleteProject}
                className={styles.cancel}
              >
                Borrar Proyecto
              </button>
              {/* <button onClick={closeEdition} className={styles.close}>
                Close Form
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
