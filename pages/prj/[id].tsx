import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";

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
    <div className={styles.project}>
      <div className={styles.header}>
        <h1>{title}</h1>
        <h6>
          {date} {author}
        </h6>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <div className={styles.footer}>
        <Link href="/">
          <a>pjmatthews.dev</a>
        </Link>
      </div>
    </div>
  );
};

export default Project;
