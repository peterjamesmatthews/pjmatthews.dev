import Footer from "../../../components/Footer";
import Project from "../../../types/Project";
import { NextPage } from "next";
import Head from "next/head";

export const TWO: Project = {
  author: "Peter Matthews",
  created: new Date("May 24 2022"),
  description: "My second project",
  id: "two",
  title: "Project Two",
};

const Two: NextPage = () => {
  return (
    <>
      <Head>
        <title>Project Two</title>
      </Head>
      <main>
        <h1>Two</h1>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Two;
