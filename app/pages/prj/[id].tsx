import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";

import { getProjectIds, getProjectProps } from "../../db/projects";
import utilStyles from "../../styles/util.module.scss";
import prjStyles from "../../styles/Project.module.scss";

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
    <div>
      <main className={`${utilStyles.main} ${prjStyles.project}`}>
        <h1 className={prjStyles.title}>{title}</h1>
        <h2 className={prjStyles.subtitle}>
          {date} {author}
        </h2>
        <div
          className={prjStyles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
      <footer className={utilStyles.footer}>
        <Link href="/">
          <a>pjmatthews.dev</a>
        </Link>
      </footer>
    </div>
  );
};

export default Project;
