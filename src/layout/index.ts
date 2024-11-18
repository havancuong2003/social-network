import { withClasses } from "../hocs";
import { Layout as L } from "./layout";
import classes from "./layout.module.scss";

export const Layout = withClasses(classes, L);
