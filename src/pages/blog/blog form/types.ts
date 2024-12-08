import { Blog } from "../../../utility/types";

export type BlogStateType = Pick<Blog, "content" | "title" | "file">;
export const BlogInitialState: BlogStateType = {
  content: "",
  title: "",
};