import { withClasses } from "../../hocs";
import { UploadPost as UP } from "./upload-post";
import classes from "./upload-post.module.scss";

export const UploadPost = withClasses(classes, UP);
