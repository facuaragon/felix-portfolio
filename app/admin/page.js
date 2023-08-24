import Link from "next/link";
import styles from "./admin.module.css";
export default function Admin() {
  return (
    <div className={styles.container}>
      <h1>Opciones de edicion</h1>
      <div className={styles.buttons}>
        <Link href="/admin/addProject">
          <button>Agregar Notas</button>
        </Link>
        <Link href="/admin/editProjects">
          <button>Editar Notas</button>
        </Link>
      </div>
    </div>
  );
}
