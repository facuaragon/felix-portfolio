"use client";
import { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [projects, setProjects] = useState();
  const [profile, setProfile] = useState();
  const fetchProfile = async () => {
    const getProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/profile`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch Profile");
        }
        return res.json();
      } catch (error) {
        console.log("Error loading topics: ", error);
      }
    };
    let profileResponse = await getProfile();
    if (profileResponse && profileResponse.profile) {
      setProfile(profileResponse.profile);
    }
  };
  const fetchProjects = async () => {
    const getProjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/projects`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }
        return res.json();
      } catch (error) {
        console.log("Error loading topics: ", error);
      }
    };
    const response = await getProjects();
    let projectsList;
    function compareFn(a, b) {
      if (a.priorityNumber < b.priorityNumber) {
        return -1;
      } else if (a.priorityNumber > b.priorityNumber) {
        return 1;
      }
      return 0;
    }
    if (response && response.projects) {
      projectsList = response.projects;
      projectsList.sort(compareFn);
    }
    setProjects(projectsList);
  };

  return (
    <Context.Provider
      value={{ projects, fetchProjects, profile, fetchProfile }}
    >
      <div>{children}</div>
    </Context.Provider>
  );
};
