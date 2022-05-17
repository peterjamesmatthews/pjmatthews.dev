import type { NextPage } from "next";
import Link from "next/link";

import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.name}>Peter Matthews</h1>

      <p className={styles.welcome}>Welcome to my website! 👋</p>

      <section className={styles.grid}>
        <Link href="/abt">
          <a className={styles.card}>
            <h2>About &rarr;</h2>
            <p>Learn more about who I am, what I do, and why I do it.</p>
          </a>
        </Link>
        <Link href="/prj">
          <a className={styles.card}>
            <h2>Projects &rarr;</h2>
            <p>Check out some of the projects I&apos;ve created.</p>
          </a>
        </Link>
      </section>
    </main>
  );
};

export default Home;
