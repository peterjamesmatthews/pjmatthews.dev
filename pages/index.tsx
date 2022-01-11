import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>pjmatthews.dev</title>
        <meta name="description" content="pjmatthews.dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Peter Matthews</h1>

        <p className={styles.description}>Welcome to my website! 👋</p>

        <div className={styles.grid}>
          <Link href="/abt">
            <a className={styles.card}>
              <h2>About &rarr;</h2>
              <p>Learn more about who I am, what I do, and why I do it.</p>
            </a>
          </Link>

          <Link href="/prj">
            <a href="/prj" className={styles.card}>
              <h2>Projects &rarr;</h2>
              <p>Check out some of the projects I&apos;ve created.</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
