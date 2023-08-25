"use client";

import styles from "./admin.module.css";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import AdminEditProjectCard from "@/components/admin/adminEditProjectCard";
import Login from "@/components/Login/Login";
import AdminAddingCard from "@/components/admin/adminAddingCard";
import EditProfileForm from "@/components/admin/profile/editProfile";

export default function Admin() {
  const { projects, fetchProjects } = useContext(Context);
  const { profile, fetchProfile } = useContext(Context);
  const { data: fetch } = useSession();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("add");

  useEffect(() => {
    const fetchData = async () => {
      if (fetch) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    };
    fetchData();
    fetchProjects();
    fetchProfile();
  }, [fetch]);

  const handleClick = (e) => {
    const target = e.target.id;
    setView(target);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Login />
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.dashboard}>
            <div className={styles.menu}>
              <div id="add" onClick={handleClick} className={styles.menuItem}>
                Agregar Notas
              </div>
              <div
                id="editProjects"
                onClick={handleClick}
                className={styles.menuItem}
              >
                Editar Notas
              </div>
              <div
                id="editProfile"
                onClick={handleClick}
                className={styles.menuItem}
              >
                Editar Perfil
              </div>
            </div>
            <div className={styles.viewPort}>
              {view === "add" ? (
                <AdminAddingCard />
              ) : view === "editProjects" ? (
                projects?.map((project) => (
                  <AdminEditProjectCard key={project._id} project={project} />
                ))
              ) : (
                <EditProfileForm />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
