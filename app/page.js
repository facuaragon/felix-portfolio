import Image from "next/image";
import styles from "./page.module.css";

import About from "@/components/About";
import Projects from "@/components/Projects";
import { projects as projectsList } from "@/utils/data";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <About />
      <Projects projects={projectsList} />
      <Footer />
    </>
  );
}
