import styles from "./footer.module.css";
import LinkedIn from "../icons/LinkedIn";
import Twitter from "../icons/Twitter";
import Instagram from "../icons/Instagram";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <section className={styles.footer}>
      <div className={styles.socialMedia}>
        <a
          href="https://www.linkedin.com/in/facundo-aragon-00919459/"
          target="_blank"
        >
          <div className={styles.iconWrapper}>
            <LinkedIn width={20} height={20} fill={"#000000"} />
            {/* <p>LinkedIn</p> */}
          </div>
        </a>
        <a href="https://www.instagram.com/facuaragon/" target="_blank">
          <div className={styles.iconWrapper}>
            <Instagram width={20} height={20} fill={"#000000"} />
            {/* <p>Instagram</p> */}
          </div>
        </a>
        <a href="https://twitter.com/facundoaragon" target="_blank">
          <div className={styles.iconWrapper}>
            <Twitter width={20} height={20} fill={"#000000"} />
            {/* <p>X</p> */}
          </div>
        </a>
      </div>
      <div className={styles.copyright}> © {year} Felix Ramallo</div>
    </section>
  );
}
