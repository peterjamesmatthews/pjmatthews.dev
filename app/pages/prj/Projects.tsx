import Footer from "../../components/Footer";
import Project from "../../types/Project";
import styles from "./Projects.module.scss";
import { ONE } from "./one/One";
import { TWO } from "./two/Two";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const PROJECTS: Project[] = [ONE, TWO];

const Projects: NextPage = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/ledger.ico" />
      </Head>
      <main>
        <h1>Projects</h1>
        <section className={styles.grid}>
          {PROJECTS.map(({ description, id, title }: Project) => {
            return (
              <>
                <Link href={`/prj/${id}`} key={id}>
                  <a className={styles.card}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                  </a>
                </Link>
              </>
            );
          })}
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Projects;
