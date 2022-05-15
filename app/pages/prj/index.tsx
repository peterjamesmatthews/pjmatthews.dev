import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

import { getProjectsProps } from "../../db/projects";
import styles from "../../styles/util.module.scss";

type ProjectsProps = {
  projects: {
    id: string;
    title: string;
    author: string;
    date: string;
  }[];
};

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: await getProjectsProps() };
};

const Projects: NextPage<ProjectsProps> = (props) => {
  const projects = props.projects;
  return (
    <div>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/ledger.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Projects</h1>

        <div className={styles.grid}>
          {projects.map(({ id, title, author, date }) => {
            return (
              <Link href={`/prj/${id}`} key={id}>
                <a className={styles.card}>
                  <h2>{title}</h2>
                  <h3>
                    {author} {date}
                  </h3>
                </a>
              </Link>
            );
          })}
        </div>
      </main>
      <footer className={styles.footer}>
        <Link href="/">
          <a>pjmatthews.dev</a>
        </Link>
      </footer>
    </div>
  );
};

export default Projects;
