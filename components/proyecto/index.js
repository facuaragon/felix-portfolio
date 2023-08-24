import styles from "./proyecto.module.css";
export default function Proyecto({ project }) {
  // const project = {
  //   title: "Elecciones 2023",
  //   description:
  //     "Sitio experimental de LA NACION para consumir contenido de las elecciones argentinas en un formato ágil, moderno y concreto. Frases de los candidatos, datos, noticias, explicadores, fotos y videos entender de otra manera.",
  //   image:
  //     "https://www.lanacion.com.ar/resizer/D4We1YtHk3uDHg0NSLd3zwoLizo=/880x586/filters:format(webp):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ETZOVMLNIFETTJIFVFKWZKJ5KQ.jpg",
  //   url: "https://elecciones.lanacion.com.ar/interactivos/23/07/manija-elecciones/index.html",
  // };
  return (
    <div
      className={styles.link2}
      style={{
        backgroundImage: ` linear-gradient(to right, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0.4)), url("${project.image}")`,
      }}
    >
      <div className={styles.texto1}>
        <div className={styles.title}>{project.title}</div>
        <div className={styles.subtitle}>{project.company}</div>
        <a href={project.url} target="_blank" className={styles.acceso}>
          + ir al articulo
        </a>
      </div>
      <div className={styles.texto2}>
        <div className={styles.title}>{project.title}</div>
        <div className={styles.subtitle}>{project.company}</div>
        <div className={styles.description}>{project.description}</div>
      </div>
    </div>
  );
}
