import { Key } from "react";

/**
 * @property {string} author      | author's full name
 * @property created     | date object from when created
 * @property description | short summary
 * @property id          | primary key, used for routing /prj/[id]
 * @property title       | title of this project
 */
interface Project {
  author: String;
  created: Date;
  description: String;
  id: Key;
  title: String;
}

export default Project;
