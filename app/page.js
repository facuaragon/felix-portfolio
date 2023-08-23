import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import { projects as projectsList } from "@/utils/data";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <About />
      <Projects projects={projectsList} />
      <Footer />
    </>
  );
}
