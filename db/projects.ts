import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const projectDir = path.join(process.cwd(), "db", "projects");

/**
 * @returns array of strings w/project ids
 */
export function getProjectIds() {
  const projects = fs.readdirSync(projectDir);
  return projects.map((project) => project.replace(/\.md$/, ""));
}

/**
 * retrieves project HTML from database
 * @param id - primary identifier of project
 * @returns { id: string, html: string }
 */
export async function getProjectProps(id: string) {
  // read in file contents
  const file = fs.readFileSync(path.join(projectDir, `${id}.md`), "utf-8");

  // parse file w/gray-matter
  const matterResult = matter(file);

  // convert gray-matter content to html w/remark
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const content = processedContent.toString();

  return {
    content,
    ...(matterResult.data as {
      author: string;
      date: string;
      title: string;
    }),
  };
}
