import { withClasses } from "../../hocs";
import { FilePreview as FP } from "./file-preview";
import classes from "./file-preview.module.scss";

export const FilePreview = withClasses(classes, FP);
