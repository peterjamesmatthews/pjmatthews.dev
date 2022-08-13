import Footer from "../components/Footer";
import styles from "./Home.module.scss";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Peter Matthews</title>
        <link rel="icon" href="/wave.ico" />
      </Head>
      <main>
        <h1>Peter Matthews</h1>

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
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
