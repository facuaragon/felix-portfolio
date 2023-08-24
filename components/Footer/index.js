import styles from "./footer.module.css";
import LinkedIn from "../icons/LinkedIn";
import Twitter from "../icons/Twitter";
import Instagram from "../icons/Instagram";
import BuzzFeed from "../icons/BuzzFeed";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <section className={styles.footer}>
      <div className={styles.socialMedia}>
        <a
          href="https://www.linkedin.com/in/felix-ramallo-a33b5323/"
          target="_blank"
        >
          <div className={styles.iconWrapper}>
            <LinkedIn width={20} height={20} fill={"#000000"} />
            <p>LinkedIn</p>
          </div>
        </a>
        <a href="https://www.instagram.com/felixramallo/" target="_blank">
          <div className={styles.iconWrapper}>
            <Instagram width={20} height={20} fill={"#000000"} />
            <p>Instagram</p>
          </div>
        </a>
        <a href="https://twitter.com/felixramallo" target="_blank">
          <div className={styles.iconWrapper}>
            <Twitter width={20} height={20} fill={"#000000"} />
            <p>X</p>
          </div>
        </a>
        <a href="https://www.buzzfeed.com/mx/felixramallo" target="_blank">
          <div className={styles.iconWrapper}>
            <BuzzFeed width={22} height={22} fill={"#000000"} />
            <p>BuzzFeed</p>
          </div>
        </a>
      </div>
      <div className={styles.copyright}> © {year} Felix Ramallo</div>
    </section>
  );
}
