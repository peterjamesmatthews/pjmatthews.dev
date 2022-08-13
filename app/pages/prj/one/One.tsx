import Footer from "../../../components/Footer";
import Project from "../../../types/Project";
import { NextPage } from "next";
import Head from "next/head";

export const ONE: Project = {
  author: "Peter Matthews",
  created: new Date("May 24 2022"),
  description: "My first project",
  id: `one`,
  title: "Project One",
};

const One: NextPage = () => {
  return (
    <>
      <Head>
        <title>Project One</title>
      </Head>
      <main>
        <h1>One</h1>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default One;
