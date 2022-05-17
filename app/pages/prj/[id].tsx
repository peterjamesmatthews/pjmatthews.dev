import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import Footer from "../../components/Footer";
import { getProjectIds, getProjectProps } from "../../db/projects";
import styles from "../../styles/Project.module.scss";

type ProjectProps = {
  author: string;
  date: string;
  content: string;
  title: string;
};

/**
 * @returns necessary props for the Project
 */
export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params?.id || Array.isArray(context.params.id))
    return { notFound: true };
  return { props: await getProjectProps(context.params.id) };
};

/**
 * @returns a list of possible project paths
 */
export const getStaticPaths: GetStaticPaths = async () => {
  let projectIds = getProjectIds();
  const paths = projectIds.map((projectId) => {
    return { params: { id: `${projectId}` } };
  });
  return {
    paths,
    fallback: false,
  };
};

const Project: NextPage<ProjectProps> = (props) => {
  const { title, date, author, content } = props;
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>
          {date} {author}
        </h2>
        <section
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
      <Footer />
    </>
  );
};

export default Project;
