import { withClasses } from "../../../hocs";
import { Posts as P } from "./posts";
import classes from "./posts.module.scss";

export const Posts = withClasses(classes, P);
