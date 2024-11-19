import { withClasses } from "../../../hocs";
import { Post as P } from "./post";
import classes from "./post.module.scss";

export const Post = withClasses(classes, P);
