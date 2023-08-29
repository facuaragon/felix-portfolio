"use client";

import styles from "./admin.module.css";
import { useSession, signOut } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import AdminEditProjectCard from "@/components/admin/adminEditProjectCard";
import Login from "@/components/Login/Login";
import AdminAddingCard from "@/components/admin/adminAddingCard";
import EditProfileForm from "@/components/admin/profile/editProfile";
import Loading from "@/components/Loading";
import NotAuthorized from "@/components/NotAuthorized";

export default function Admin() {
  const admin = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const master = process.env.NEXT_PUBLIC_MASTER_EMAIL;
  const { projects, fetchProjects } = useContext(Context);
  const { profile, fetchProfile } = useContext(Context);
  const {
    filtered,
    filterProjectsTitle,
    filterProjectsCompany,
    filterProjectsDescription,
    cleanFilters,
  } = useContext(Context);
  const { data: fetch, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("add");
  const [filters, setFilters] = useState({
    title: "",
    company: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {
        setLoading(false);
        if (fetch.user.email !== admin && fetch.user.email !== master) {
          const logout = async () => {
            await signOut();
          };
          logout();
        }
      } else {
        setLoading(true);
      }
    };
    fetchData();
    fetchProjects();
    fetchProfile();
  }, [fetch, status]);

  const handleClick = (e) => {
    const target = e.target.id;
    setView(target);
    cleanFilters();
  };

  const handleFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "title") {
      filterProjectsTitle(e.target.value);
    } else if (e.target.name === "company") {
      filterProjectsCompany(e.target.value);
    } else if (e.target.name === "description") {
      filterProjectsDescription(e.target.value);
    } else return;
  };

  const handleClean = () => {
    cleanFilters();
    setFilters({
      title: "",
      company: "",
      description: "",
    });
  };

  if (loading && status === "unauthenticated") {
    return (
      <div className={styles.container}>
        <Login />
      </div>
    );
  } else if (status === "loading") {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  } else {
    if (fetch.user.email !== admin && fetch.user.email !== master) {
      return (
        <div className={styles.container}>
          <NotAuthorized />
        </div>
      );
    } else
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
                {/* {view === "editProjects" && ( */}
                <div
                  className={styles.filters}
                  style={
                    view === "editProjects"
                      ? {
                          height: "fit-content",
                          padding: "10px 10px 20px",
                          borderBottom: "1px solid #000",
                        }
                      : {
                          height: "0px",
                          padding: "0px",
                        }
                  }
                >
                  <p>Filtrar por:</p>
                  <div className={styles.filteredGroup}>
                    <label>Titulo: </label>
                    <input
                      name="title"
                      value={filters.title}
                      onChange={handleFilters}
                    />
                  </div>
                  <div className={styles.filteredGroup}>
                    <label>Compañía: </label>
                    <input
                      name="company"
                      value={filters.company}
                      onChange={handleFilters}
                    />
                  </div>
                  <div className={styles.filteredGroup}>
                    <label>Description: </label>
                    <input
                      name="description"
                      value={filters.description}
                      onChange={handleFilters}
                    />
                  </div>
                  <button onClick={handleClean}>Borrar Filtros</button>
                </div>
                {/* )} */}

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
                  filtered?.map((project) => (
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
