import { Key } from "react";

interface Project {
  /**
   * Full name of this project's author.
   */
  author: String;
  /**
   * Date of this project's creation.
   */
  created: Date;
  /**
   * Description of this project. Will be shown in previews.
   */
  description: String;
  /**
   * Underlying id for this project.
   */
  id: Key;
  /**
   * Title of this project.
   */
  title: String;
}

export default Project;
