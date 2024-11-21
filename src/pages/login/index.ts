import { withClasses } from "../../hocs";
import { Login as L } from "./login";
import classes from "./login.module.scss";

export const Login = withClasses(classes, L);
